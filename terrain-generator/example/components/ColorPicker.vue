<template>
    <div class="colorpicker-container">
        <label>Color</label>
        <input
            type="color"
            :value="value"
            @input="event => onChange(event.target.value)">

        <span>{{ value }}</span>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        onChange: Function,
    },
}
</script>
