<template>
    <div class="layer-config">
        <div class="layer-header">
            <span>Layer {{ id }}</span>
            <button
                class="remove-layer-button"
                @click="removeLayer"
            >Remove</button>
        </div>
        <div class="layer-controls">
            <TextInput
                name="Seed"
                :value="seed"
                :onChange="seed => onSeedChange(seed)"
            />
            <ColorPicker
                :value="color"
                :onChange="color => onColorChange(color)"
            />

            <Slider
                name="Smoothness"
                :min="0.01"
                :max="1"
                :step="0.01"
                :value="smoothness"
                :onChange="smoothness => onSmoothnessChange(smoothness)"
            />
            <Slider
                name="Threshold"
                :min="0.01"
                :max="1"
                :step="0.01"
                :value="threshold"
                :onChange="threshold => onThresholdChange(threshold)"
            />

            <div class="function-controls">
                <div class="filter-header">Filter</div>
                <select
                    @change="algorithmChanged">
                    <option disabled selected value> -- select an option -- </option>
                    <option
                        v-for="algorithm of algorithms"
                        :key="algorithm.id">{{ algorithm.id }}</option>
                </select>
                <div
                    v-if="algorithmInstance && algorithmInstance.inputs.length"
                    class="function-controls">
                    <component
                        v-for="input of algorithmInstance.inputs"
                        :key="input.id"
                        :is="input.type"
                        v-bind="input" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from './TextInput';
import Slider from './Slider';
import ColorPicker from './ColorPicker';

const ModifyCellFn = {
    ConcentratedOrigin: {
        id: 'ConcentratedOrigin',
        createMetadataMapping(options, onChange) {

            const getConfig = () => ({
                intensity: intensitySlider.value,
                x: xSlider.value,
                y: ySlider.value,
            });

            const xSlider = {
                id: 'originX',
                name: 'X',
                type: 'Slider',
                min: 0,
                max: options.width,
                value: 0,
                step: 1,
                onChange: newX => {
                    xSlider.value = newX;
                    onChange(getConfig());
                }
            };

            const ySlider = {
                id: 'originY',
                name: 'Y',
                type: 'Slider',
                min: 0,
                max: options.height,
                value: 0,
                step: 1,
                onChange: newY => {
                    ySlider.value = newY;
                    onChange(getConfig());
                }
            };
            const maxWorldDistance = Math.sqrt(options.width ** 2 + options.height ** 2);
            const intensitySlider = {
                id: 'intensity',
                name: 'Intensity',
                type: 'Slider',
                min: 0,
                max: maxWorldDistance * 2,
                value: maxWorldDistance / 2,
                step: 1,
                onChange: newY => {
                    intensitySlider.value = newY;
                    onChange(getConfig());
                }
            };

            return {
                getConfig,
                inputs: [
                    intensitySlider,
                    xSlider,
                    ySlider,
                ],
            };
        },
        create(config) {
            return (cell, grid) => {
                const { width, height } = grid;

                const distanceFromOrigin = Math.sqrt((config.x - cell.x) ** 2 + (config.y - cell.y) ** 2);
                // const maxWorldDistance = Math.sqrt(width ** 2 + height ** 2);
                const percOfMaxDistance = distanceFromOrigin / config.intensity;//maxWorldDistance;
                const closenessToOrigin = 1 - percOfMaxDistance;

                // 0.50 value
                // 1% away
                // currently - 0.50 * 0.01 === 0.005
                // desired - 0.50 *

                return cell.threshold * closenessToOrigin;
            };
        },
    },
};



export default {
    components: {
        TextInput,
        Slider,
        ColorPicker,
    },
    props: {
        id: String,

        seed: String,
        onSeedChange: Function,

        color: String,
        onColorChange: Function,

        smoothness: Number,
        onSmoothnessChange: Function,

        threshold: Number,
        onThresholdChange: Function,

        onRemoveLayerClicked: Function,
        onAlgorithmChange: Function,

        gridConfig: { type: Object, required: true },
    },
    data() {
        const self = this;

        return {
            config: {
                id: this.id,
                seed: this.seed,
                color: this.color,
                smoothness: this.smoothness,
                threshold: this.threshold,
            },
            selectedAlgorithmId: null,
            algorithmInstance: null,
            algorithms: Object.values(ModifyCellFn),
        }
    },
    methods: {
        removeLayer() {
            this.onRemoveLayerClicked(this.id);
        },
        algorithmChanged(event) {
            const self = this;
            this.selectedAlgorithmId = event.target.value;

            const algorithm = ModifyCellFn[this.selectedAlgorithmId];

            const config = {
                width: this.gridConfig.width,
                height: this.gridConfig.height,
            };

            const algorithmInstance = algorithm.createMetadataMapping(config, notifyAlgorithmChanged);
            this.algorithmInstance = algorithmInstance;

            notifyAlgorithmChanged();

            function notifyAlgorithmChanged() {
                const modifyCellFn = (...args) => algorithm.create(algorithmInstance.getConfig())(...args);
                self.onAlgorithmChange(modifyCellFn);
            }
        },
    },
    computed: {
        selectedAlgorithm() {
            return this.algorithms.find(a => a.id === this.config.selectedAlgorithmId);
        },
    }
}
</script>

<style scoped>
.layer-header {
    font-weight: bold;
}

.layer-config {
    max-width: 250px;
    padding: 10px;
    border: 1px solid gray;
}

.layer-controls {
    margin-top: 10px;
}

.remove-layer-button {
    float: right;
}

.filter-header {
    margin-top: 10px;
    font-weight: bold;
}
</style>
