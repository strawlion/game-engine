<template>
    <div class="app">
        <div class="left-column">
            <div class="world-config">
                <div class="world-header">World</div>
                <Slider
                    name="Width"
                    :min="1"
                    :max="100"
                    :step="1"
                    :value="gridConfig.width"
                    :onChange="value => gridConfig.width = value"
                />
                <Slider
                    name="Height"
                    :min="1"
                    :max="100"
                    :step="1"
                    :value="gridConfig.height"
                    :onChange="value => gridConfig.height = value"
                />
            </div>
            <Layer
                v-for="layer of layers"
                :key="layer.id"
                :seed="layer.seed"
                :onSeedChange="seed => layer.seed = seed"

                :color="layer.color"
                :onColorChange="color => layer.color = color"

                :smoothness="layer.smoothness"
                :onSmoothnessChange="smoothness => layer.smoothness = smoothness"

                :threshold="layer.threshold"
                :onThresholdChange="threshold => layer.threshold = threshold"
            />
        </div>
        <div class="right-column">
            <TerrainPreview
                :width="renderConfig.width"
                :height="renderConfig.height"
                :terrainBlocks="terrainBlocks"
            />
        </div>
    </div>
</template>

<script>
import Slider from './Slider';
import Layer from './Layer';
import TerrainPreview from './TerrainPreview';
import generateTerrain from './generateTerrain';

const Color = {
    dirtBrown: '#573B0C',
    water: '#063fb2',
};

export default {
    components: {
        Slider,
        Layer,
        TerrainPreview,
    },
    data() {
        return {
            renderConfig: {
                width: 600,
                height: 400,
            },
            gridConfig: {
                width: 50,
                height: 50,
                noMatchingLayerColor: 'black',
            },
            layers: [
                createLayer({
                    id: 'dirt',
                    color: Color.dirtBrown,
                })
            ]
        }
    },
    computed: {
        terrainBlocks() {
            return generateTerrain(this.renderConfig, {
                ...this.gridConfig,
                layers: this.layers,
            });
        }
    }
};

function createLayer(options) {
    return {
        id: options.id,
        seed: options.seed || createRandomSeed(),
        color: options.color || createRandomHex(),
        smoothness: 0.32,
        threshold: 0.38,
        scalingFactor: 1,
    };
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

</script>

<style scoped>
.app {
    display: flex;
}

.world-header {
    font-weight: bold;
}
.world-config {
    max-width: 250px;
    padding: 10px;
    border: 1px solid gray;
}

.layer-config {
    margin-top: 5px;
}

.left-column {
    min-width: 270px;
}
.right-column {
    margin-left: 1px;
}
</style>
