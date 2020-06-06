<template>
    <div class="layer-config">
        <div class="layer-header">Layer {{ id }}</div>
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
    </div>
</template>

<script>
import TextInput from './TextInput';
import Slider from './Slider';
import ColorPicker from './ColorPicker';

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
    },
    data() {
        return {
            config: {
                id: this.id,
                seed: this.seed || createRandomSeed(),
                color: this.color || createRandomHex(),
                smoothness: this.smoothness,
                threshold: this.threshold,
                scalingFactor: 1,
            }
        }
    },
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
</style>
