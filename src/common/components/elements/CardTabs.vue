<template>
    <card class="card-tabs">
        <div class="tab-headers">
            <div class="tab-th" v-for="tab in tabs" v-bind:key="tab.name || tab.title" @click="switchTab(tab)" :class="isTabActive(tab) ? 'active':''">
                {{ tab.title }}
            </div>
        </div>

        <div class="tab-contents">
            <slot :active="active" />
        </div>
    </card>
</template>

<script>
import Card from './Card.vue'
    export default {
       components: { Card },
        props : {
            tabs: {
                default : []
            }
        },
        data(){
            return {
                active : this.tabs[0]?.name || this.tabs[0]?.title || 'default'
            }
        },
        methods : {
            isTabActive(tab){
                return this.active == (tab.name||tab.title);
            },
            switchTab(tab){
                this.active = tab.name || tab.title;
                this.$emit('switchTab', this.active)
            }
        }
    }
</script>

<style lang="scss" scoped>
.card-tabs{
    @apply px-0;
    
    .tab-headers , .tab-contents{
        @apply px-8;
    }
    .tab-headers {
        @apply flex flex-wrap justify-center md:justify-start items-center border-b-2 border-gray border-opacity-5 ;
        @apply md:space-x-2;

        .tab-th {
            @apply text-gray px-4 pb-8; 
            @apply md:px-4 md:pb-4 cursor-pointer;

            &.active{
                @apply text-primary font-bold md:border-b-2 md:border-primary md:border-opacity-50 md:-mb-1;
            }
        }
    }

    .tab-contents{
        @apply  py-4;
    }
}
</style>