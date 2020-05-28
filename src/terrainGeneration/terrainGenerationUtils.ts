

interface Config {
    width: number;
    height: number;
    chanceToStartAlive: number;
    neighborLimits: [number, number]; // Lower and upper bound of living neighbors at which a living cell dies
    birthNumber: number; // number of living neighbours at which a dead cell becomes alive.
    numberOfSteps: number; // number of times we perform the simulation step.
}

function initializeCellularGrid(config: Config) {
    let map = [];

    for (let i = 0; i < config.width; i++) {
        map.push([]);
        for(let y = 0; y < config.height; y++) {
            map.push(Math.random() < config.chanceToStartAlive);
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
        return getCombinations([
                    [-1, 0, 1],
                    [-1, 0, 1]
                ])
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
