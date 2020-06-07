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
        name: String,
        min: Number,
        max: Number,
        step: Number,
        value: Number,
        onChange: Function,
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
