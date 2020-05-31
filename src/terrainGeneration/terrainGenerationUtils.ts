import SimplexNoise from 'simplex-noise';

interface TerrainGenerationConfig {
    width: number;
    height: number;
    chanceToStartAlive: number;
    neighborLimits: [number, number]; // Lower and upper bound of living neighbors at which a living cell dies
    birthNumber: number; // number of living neighbours at which a dead cell becomes alive.
    numberOfSteps: number; // number of times we perform the simulation step.
}

export default {
    generateCellularGrid,
    generateSimplexGrid,
    generateCaveSystem,
};

// TODO: Floodfill to count caves https://en.wikipedia.org/wiki/Flood_fill
// Cellular Automata
function generateCellularGrid(config: TerrainGenerationConfig) {
    let map = [];

    for (let x = 0; x < config.width; x++) {
        map.push([]);
        for(let y = 0; y < config.height; y++) {
            map[x].push(Math.random() < config.chanceToStartAlive);
        }
    }

    for (let i = 0; i < config.numberOfSteps; i++) {
        map = doSimulationStep(map);
    }

    return map;

    function doSimulationStep(map){
        const newMap = [];

        //Loop over each row and column of the map
        for(let x = 0; x < map.length; x++) {
            newMap.push([]);
            for(let y = 0; y < map[0].length; y++) {
                const isCellAlive = map[x][y];

                newMap[x][y] = isCellAlive ? (countAliveNeighbours(map, x, y) < config.neighborLimits[1]) :
                                             (countAliveNeighbours(map, x, y) > config.birthNumber);
            }
        }
        return newMap;
    }

    // Returns the number of cells in a ring around (x,y) that are alive.
    function countAliveNeighbours(map, x, y){
        return getCombinations(
                    [-1, 0, 1],
                    [-1, 0, 1]
                )
                .map(toNeighberCoordinates)
                .filter(toNonSelfCells)
                .reduce(toLivingNeighbors, 0);


        function toNeighberCoordinates(neighborOffset) {
            return [
                neighborOffset[0] + x,
                neighborOffset[1] + y,
            ]
        }

        function toNonSelfCells(neighborCoordinates) {
            const isSelfCell = neighborCoordinates[0] === x && neighborCoordinates[1] === y;
            return !isSelfCell;
        }

        function toLivingNeighbors(livingNeighborCount, [neighborX, neighborY]) {
            if (!isInBounds(map, [neighborX, neighborY]) || map[neighborX][neighborY]) {
                return livingNeighborCount + 1;
            }
            return livingNeighborCount;
        }
    }
}


interface SimplexConfig<CellValue> {
    width: number;
    height: number;
    seed?: string;
    fillCellValue?: (noiseValue: number) => CellValue;
}

function generateSimplexGrid<CellValue = number>(config: SimplexConfig<CellValue>): CellValue[][] {
    const simplexNoise  = new SimplexNoise(config.seed || undefined);
    const fillCellValue = config.fillCellValue || (v => v);

    const map = [];

    for (let x = 0; x < config.width; x++) {
        map.push([]);
        for(let y = 0; y < config.height; y++) {
            map[x][y] = fillCellValue(noise(x, y));
        }
    }
    return map;

    function noise(x, y) {
        // Scale range to 0-1 for ease of consumption
        return scale(
            simplexNoise.noise2D(x, y),
            -1, 1, // Input range
             0, 1 // Output range
        );
    }
}


// Terrain generation
// Idea:
// Generate 2d noise grid.
// Assign either cave or grass to each square (user defined thresholds)
// Higher level logic?


// Cave generation
// Idea:
//      - Generate grid of dirt
//      - Generate grid of noise
//      - Select random start points on dirt grid, and recursively "dig" from point
// Explanation:
//      - Nearby points within a set stddev will become part of the cave
//
// Cave "Digging" Properties:
//      - DigDecay - 0<=n<=1 - Decrease threshold for digging next block by this amount over time. Sets upper bound on total cave size
//      - DigThreshold - 0<=n<=1 - Threshold for digging next block. Neighbor must be within this amount to be dug
//          - Note: Can have optional x/y threshold to encourage deeper/wider holes
//      - AngleAdjustment - 0<=n<=1 - Encourage how curvy tunnel is. Create vector of average direction of tunnel (how?), adjust DigThreshold by this amount
//          - Note: can have x,y to encourage upward or downward curves


function generateCaveSystem(config) {
    const {
        width,
        height,
        cavePercentage = 0.3,
    } = config;

    const grid = generateSimplexGrid<any>({
                    width,
                    height,
                });

    digCave(0, 0, { digThreshold: 0.21 });

    return grid;


    interface DigCaveConfig {
        // Note: Can have optional x/y threshold to encourage deeper/wider holes
        digThreshold: number; // 0<=n<=1 - Threshold for digging next block. Neighbor must be within this amount to be dug

        // DigDecay - 0<=n<=1 - Decrease threshold for digging next block by this amount over time. Sets upper bound on total cave size
        // AngleAdjustment - 0<=n<=1 - Encourage how curvy tunnel is. Create vector of average direction of tunnel (how?), adjust DigThreshold by this amount
        //    Note: can have x,y to encourage upward or downward curves
    }


    // TODO: Only recurses to a cell once.
    // This could affect things if recursion moves from vertical rather than horizontal
    // How should we handle this?

    // TODO: logic for retrying failed caves (one cell etc)
    // TODO: Pick multiple starting cells for one cave system?
    function digCave(x, y, config: DigCaveConfig) {
        const seenCells = new Set();

        const originalNoiseValue = grid[x][y];

        digCaveHelper(x, y, null);
        function digCaveHelper(x, y, prevNoiseValue) {
            const cellId = `${x},${y}`;
            const isXOutOfBounds = x < 0 || x >= grid.length;
            const isYOutOfBounds = y < 0 || y >= grid[0].length;
            if (isXOutOfBounds || isYOutOfBounds || seenCells.has(cellId)) {
                return;
            }

            if (prevNoiseValue != null) {
                console.log(grid[x][y] - prevNoiseValue)
            }

            // TODO: May also always use starting point value rather then latest cell.Test it out
            const meetsDigThreshold = prevNoiseValue == null || (Math.abs(grid[x][y] - prevNoiseValue) <= config.digThreshold);
            if (!meetsDigThreshold) {
                return;
            }


            seenCells.add(cellId);


            // Dig each neighbor
            const neighborCoords = [
                [x, y - 1],
                [x - 1, y],
                [x, y + 1],
                [x + 1, y],
            ];
            for (const [neighborX, neighborY] of neighborCoords) {
                digCaveHelper(
                    neighborX,
                    neighborY,
                    grid[x][y],
                );
            }

            grid[x][y] = 'cave';
        }
    }
}



function scale(num, inMin, inMax, outMin, outMax) {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function getCombinations(...arrays) {
    const combinations = [];
    const processedIndexSet = new Set();
    function getCombinationsHelper(...indexes) {
        const values = indexes.map((valueIdx, arrayIdx) => arrays[arrayIdx][valueIdx]);
        const combinationId = indexes.join(',');
        if (processedIndexSet.has(combinationId) || values.some(v => !v)) {
            return;
        }
        combinations.push(values);
        processedIndexSet.add(combinationId);

        // Reverse loop to ensure combinations generated in nice order
        for (let i = indexes.length - 1; i >= 0; i--) {
            const adjustedIndexes = indexes.slice();
            adjustedIndexes[i] += 1;
            getCombinationsHelper(...adjustedIndexes);
        }

    }

    getCombinationsHelper(...arrays.map(() => 0));
    return combinations;
}


function isInBounds(valuesArray, indexArray) {
    let array = null;

    for (let i = 0; i < indexArray.length; i++) {
        array = valuesArray[i];
        const index = indexArray[i];
        if (index < 0 || index >= array.length) {
            return false;
        }
    }
    return true;
}


// resourcew
// https://gamedev.stackexchange.com/questions/53400/cave-generation-with-perlin-worms
// https://gamedev.stackexchange.com/questions/33590/how-to-generate-caves-that-resemble-those-of-minecraft
// http://libnoise.sourceforge.net/examples/worms/index.html
// https://www.reddit.com/r/proceduralgeneration/comments/da8gms/generate_structures_in_chunkbased_terrain/
