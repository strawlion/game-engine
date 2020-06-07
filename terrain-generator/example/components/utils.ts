import terrainGenerationUtils from '../../src/index';

export default {
    generateTerrain,
    // generateFractalTree,
};
// Start at 0,0 but I can translate it
// Consists of rectangles
// function generateFractalTree() {
//     const maxDepth = 3;
//     const numBranchesPerLevel = 2;
//     const branchRotation = 0;

//     const trunk = {
//         x: 0,
//         y: 0,
//         rotation: 0,
//         width: 200,
//         height: 100,
//     }
//     generateFractalTreeHelper(trunk, 0)
//     function generateFractalTreeHelper(branch, depth) {

//         branch.branches = [
//                 generateFractalTreeHelper({
//                 x: branch.x,
//                 y: branch.y,
//                 rotation: branch.rotation + Math.PI/2,
//                 width: branch.width/2,
//                 height: branch.height/2,
//                 branches: Array(numBranchesPerLevel).fill(null).map(() => generateFractalTreeHelper(branch))
//             }, depth + 1)
//         ];
//         Array(numBranchesPerLevel).fill(null).map(() => {
//             generateFractalTreeHelper(branch, depth + 1)
//         })
//         return branch;
//         // {
//         //     // x: branch.x,
//         //     // y: branch.y,
//         //     // rotation: branch.rotation + Math.PI/2,
//         //     // width: branch.width/2,
//         //     // height: branch.height/2,
//         //     branches: Array(numBranchesPerLevel).fill(null).map(() => generateFractalTreeHelper(branch))
//         // }
//         // for (let i = 0; i < numBranchesPerLevel; i++) {

//         // }
//     }
// }

function generateTerrain(world: World, options: GenerateTerrainOptions): Block[] {
    const { terrainBuilder } = terrainGenerationUtils;
    const grid = terrainBuilder({
        width: options.width,
        height: options.height,
    })
    .layers(options.layers)
    .build()

    const layerToColor = options.layers.reduce((layerToColor, layer) => {
        layerToColor[layer.id] = layer.color;
        return layerToColor;
    }, {});

    const terrainOriginY = 0;
    const numHorizontalBlocks = grid.length;
    const numVerticalBlocks = grid[0].length;
    const blockWidth = Math.ceil(world.width / numHorizontalBlocks);
    const blockHeight = Math.ceil((world.height - terrainOriginY) / numVerticalBlocks);

    const terrainBlocks: Block[] = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const block = grid[x][y];

            terrainBlocks.push({
                x: x * blockWidth,
                y: terrainOriginY + (y * blockHeight),
                width: blockWidth,
                height: blockHeight,
                color: layerToColor[block] || options.noMatchingLayerColor,
            });
        }
    }

    return terrainBlocks;
}

interface LayerConfig {
    id: string;
    seed: string;
    color: string;
    smoothness: number;
    threshold: (noise: number, x: number, y: number) => boolean;
    scalingFactor: number;
}


interface GenerateTerrainOptions {
    width: number;
    height: number;
    layers: LayerConfig[];
    noMatchingLayerColor: string;
}

interface World {
    width: number;
    height: number;
}

interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}
