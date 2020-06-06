<template>
    <canvas
        ref="canvas"
        :width="width"
        :height="height">
    </canvas>
</template>

<script>
export default {
    props: {
        width: Number,
        height: Number,
        terrainBlocks: Array,
    },
    computed: {
        context() {
            return this.$refs.canvas.getContext('2d');
        }
    },
    mounted() {
        this.render();
    },
    watch: {
        terrainBlocks() {
            this.render();
        },
        width() {
            this.render();
        },
        height() {
            this.render();
        }
    },
    methods: {
        render() {
            const { context, terrainBlocks } = this;
            context.fillStyle = '#fff';
            context.fillRect(0, 0, this.width, this.height);

            for (const block of terrainBlocks) {
                context.beginPath();
                context.rect(
                    block.x,
                    block.y,
                    block.width,
                    block.height
                );

                context.fillStyle = block.color;
                context.fill();
            }
        }
    }
}
</script>
