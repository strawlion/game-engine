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
                :id="layer.id"
                :seed="layer.seed"
                :onSeedChange="seed => layer.seed = seed"

                :color="layer.color"
                :onColorChange="color => layer.color = color"

                :smoothness="layer.smoothness"
                :onSmoothnessChange="smoothness => layer.smoothness = smoothness"

                :threshold="layer.thresholdValue"
                :onThresholdChange="threshold => layer.thresholdValue = threshold"

                :onRemoveLayerClicked="removeLayer"
            />
            <button
                class="add-layer-button"
                @click="addLayer"
            >Add Layer</button>
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
import utils from './utils';

const {
    generateTerrain,
    generateFractalTree,
} = utils;

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
        const self = this;

        const originTestLayer = createLayer({
            id: 'originTest',
            color: Color.water,
            // Example of having values radiate from an origin
            threshold(noise, x, y) {
                const { width, height } = self.gridConfig;
                const originPoint = {
                    x: 0,
                    y: 0,
                };

                const distanceFromOrigin = Math.sqrt((originPoint.x - x) ** 2 + (originPoint.y - y) ** 2);
                const maxWorldDistance = Math.sqrt(width ** 2 + height ** 2);
                const percOfMaxDistance = distanceFromOrigin / maxWorldDistance;
                const pointCloseness = 1 - percOfMaxDistance;

                // Creates more filled in around origin (why?)
                // Mostly Guarantees points around origin are included
                // return (noise * percOfMaxDistance) <= originTestLayer.thresholdValue;

                // Creates more sparse around origin, but still more closer
                // Only taking away
                return noise <= (originTestLayer.thresholdValue * pointCloseness);
            }
        });

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
                }),

                // For testing,
                originTestLayer,
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
    },
    methods: {
        addLayer() {
            this.layers.push(
                createLayer({
                    id: createRandomSeed(),
                }),
            )
        },
        removeLayer(id) {
            this.layers = this.layers.filter(layer => layer.id !== id);
        }
    }
};

function createLayer(options) {
    const layer = {
        id: options.id,
        seed: options.seed || createRandomSeed(),
        color: options.color || createRandomHex(),
        smoothness: 0.32,
        thresholdValue: 0.38,
        threshold: options.threshold || (noise => noise <= layer.thresholdValue),
    };
    return layer;
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

<style>
html, body, .app {
    height: 100%;
}
body {
    margin: 0;
}

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
    overflow: auto;
}
.right-column {
    margin-left: 1px;
}

.add-layer-button {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
