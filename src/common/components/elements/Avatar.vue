<template>
    <div class="avatar inline-grid rounded-full" :style="{ backgroundImage: `url(${source})` , width: width  , height: height}"></div>
</template>

<script>
export default {
    props : {
        source: {
            type: String
        },
        width: {
            default :  '72px',
            type: String
        },
        height: {
            default :  '72px',
            type: String
        }
    },
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 34px;
    height: 34px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXA8AAesBNGQg4IAAAAAASUVORK5CYII=);
    background-color: rgba(25, 25, 25, 0.1);

    background-size: cover;
    background-position: center;
}
</style>
