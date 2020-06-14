import terrainGenerationUtils from '../src';
import UILayerConfig from './UILayerConfig';
import Block from './Block';

export default {
    generateTerrain,
    createRandomSeed,
    createRandomHex,
};

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

function createRandomSeed() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let seed = '';
    for (let i = 0; i < 5; i++) {
        seed += characters[Math.floor(Math.random() * characters.length)];
    }
    return seed;
}

function createRandomHex() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}



interface GenerateTerrainOptions {
    width: number;
    height: number;
    layers: UILayerConfig[];
    noMatchingLayerColor: string;
}

interface World {
    width: number;
    height: number;
}
