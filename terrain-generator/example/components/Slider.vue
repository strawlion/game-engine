<template>
    <div class="slider-container">
        <label class="slider-name">{{ name }}</label>
        <input
            type="range"
            class="slider"
            :min="min"
            :max="max"
            :step="step"
            :value="value"
            @input="onInputEvent">
        <span class="slider-value">{{ value }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String, required: true },
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        step: { type: Number, required: true },
        value: { type: Number, required: false }, // Why does this cause things to throw?
        onChange: { type: Function, required: true },
    },
    methods: {
        onInputEvent(event) {
            this.onChange(Number(event.target.value))
        }
    }
}
</script>

<style scoped>
</style>
