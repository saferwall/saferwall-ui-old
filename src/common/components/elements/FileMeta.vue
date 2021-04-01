<template>
<div class="filemeta">
    <div>
        <h4>Classification</h4>
        <p :class="classification.color">
            <svg class="mr-2" width="15" height="15">
                <image :xlink:href="`../../assets/icons/${classification.icon}.svg`" width="15" height="15" />
            </svg>
            <span>{{ classification.name }}</span>
        </p>
    </div>
    <div >
        <h4>File Name</h4>
        <p>{{ filename }}</p>
    </div>
    <div>
        <h4>Antivirus</h4>
        <p>{{ scan.value }}/{{ scan.total }}</p>
    </div>
</div>
</template>

<script>
export default {
    props: {
        filename: {
            type: String
        },
        scan: {
            type: Object,
            default: ()=>{return {}}
        },
        classification: {
            type: Object,
            default: ()=>{return {}}
        }
    }
}
</script>

<style lang="scss" scoped>
.filemeta {
    @apply mt-10 flex flex-wrap space-x-4 xl:space-x-12 justify-start;

    h4 {
        @apply font-bold text-sm uppercase text-gray;
    }

    p {
        @apply font-bold flex items-center text-sm mt-1;
    }

    .danger {
        @apply text-danger;
    }

    .success {
        @apply text-success;
    }

    .warning {
        @apply text-warning;
    }
}
</style>
