<template>
<div class="w-full text-center ">
    <div class="header grid justify-items-center space-y-4 my-3">
        <div class="icon">
            <svg v-if="icon == 'mail'" xmlns="http://www.w3.org/2000/svg" width="55.146" height="39.863" viewBox="0 0 55.146 39.863">
                <path id="Icon" d="M55.146,98.617V63.745a2.482,2.482,0,0,0-.652-1.676l-.019-.021a2.486,2.486,0,0,0-1.824-.8H2.5a2.486,2.486,0,0,0-1.822.8l-.021.024A2.483,2.483,0,0,0,0,63.745V98.617a2.483,2.483,0,0,0,.653,1.677l.017.019a2.486,2.486,0,0,0,1.825.8H52.651a2.486,2.486,0,0,0,1.824-.8l.019-.021A2.482,2.482,0,0,0,55.146,98.617ZM12.232,88.425a1.248,1.248,0,0,0-1.764.036L2.5,96.764V65.6L17.458,81.181l-4.042,4.209a1.248,1.248,0,0,0,1.8,1.728l3.972-4.136,5.758,6a3.63,3.63,0,0,0,5.256,0l5.758-6L50.971,98.617H4.175l8.093-8.428A1.248,1.248,0,0,0,12.232,88.425ZM28.4,87.251a1.135,1.135,0,0,1-1.657,0L4.175,63.745h46.8Zm9.287-6.07L52.651,65.6V96.764Z" transform="translate(0 -61.25)" fill="#0d9677" />
            </svg>
            <svg v-else-if="icon == 'check'" xmlns="http://www.w3.org/2000/svg" width="55.025" height="55.025" viewBox="0 0 55.025 55.025">
                <g id="checked" transform="translate(-9.2 -13.2)">
                    <path d="M31.705,38.9a2.055,2.055,0,1,0-3.042,2.765L39.1,53.005a2.066,2.066,0,0,0,1.452.691h.069a1.883,1.883,0,0,0,1.452-.622L68.481,26.737a2,2,0,0,0,0-2.9,2.065,2.065,0,0,0-2.9,0L40.692,48.65Z" transform="translate(-5.845 -3.099)" fill="#0d9677" />
                    <path d="M62.151,38.639a2.037,2.037,0,0,0-2.074,2.074A23.365,23.365,0,1,1,36.712,17.348a2.074,2.074,0,1,0,0-4.148A27.512,27.512,0,1,0,64.225,40.712,2.037,2.037,0,0,0,62.151,38.639Z" transform="translate(0 0)" fill="#0d9677" />
                </g>
            </svg>

        </div>
        <h2 class="title text-3xl font-semibold">
            {{title}}
        </h2>
        <p class="text-gray-medium">
            {{message}}
        </p>
    </div>
    <div class="content mt-8 mb-16">
        <router-link :to="link" class="btn-submit btn-message">
            {{ button }}
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: 'check'
        },
        button: {
            type: String,
            default: 'Go Home'
        },
        link: {
            type: String,
            default: '/'
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-message {
    @apply px-12;
}
</style>
