<template>
    <div class="text-input">
        <label>{{ name }}</label>
        <input
            type="text"
            :value="value"
            @input="onInputEvent">
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        value: String,
        onChange: Function,
    },
    methods: {
        onInputEvent(event) {
            this.onChange(event.target.value)
        }
    }
}
</script>
