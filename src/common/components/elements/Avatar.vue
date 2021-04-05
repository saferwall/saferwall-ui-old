<template>
    <div class="avatar inline-grid rounded-full" :style="{ backgroundImage: `url(${getSource})` , width: width  , height: height}"></div>
</template>

<script>
import { generateAvatar } from '@/common/helpers';

export default {
    props : {
        username: {
            type: String,
            default : null
        },
        source: {
            type: String,
            default : null
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
    computed : {
        getSource(){
            return this.username && generateAvatar(this.username) || this.source;
        }
    }
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
