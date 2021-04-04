<template>
    <card-tab class="settings-delete space-y-10" :active="active">
        <div class="sd-form flex flex-col space-y-4">
            <div class="sd-group">
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58">
                    <g id="Icon" transform="translate(-318.75 -71.516)">
                        <circle  cx="29" cy="29" r="29" transform="translate(318.75 71.516)" fill="#db3434"/>
                        <text  transform="translate(342.75 112.516)" fill="#fff" font-size="32" font-family="OpenSans-Semibold, Open Sans" font-weight="600"><tspan x="0" y="0">!</tspan></text>
                    </g>
                </svg>

                <h2 class="sd-message">This action is permanent</h2>
                <p>Deleting a user account is not a reversible change. Any information associated with that account will be deleted and cannot be retrieved.</p>
            </div>
            <div class="sd-group">
                <label for="agree">
                    <input class="sd-checkbox" type="checkbox" name="agree" id="agree"> I understand that this action cannot be undone.
                </label>
            </div>
            <div class="sd-group">
                <btn size="xl" class="active">
                    Delete
                </btn>
            </div>
        </div>
    </card-tab>
</template>

<script>
import CardTab from '@/common/components/elements/CardTab.vue'
import Btn from '@/common/components/elements/button/Btn.vue'
export default {
    components: {
        CardTab,
        Btn,
    },
    props:
        {
        active: {
            type: Boolean
        }
    }

}
</script>

<style lang="scss" scoped>
.settings-delete{
    .sd-group{
        @apply flex flex-col justify-center ;
    }
    .sd-message{
        @apply py-4 text-red-500 font-bold text-2xl;
    }
    .active{
        @apply bg-red-500;
    }

    .sd-checkbox{
        @apply h-4 w-4 ;
    }
}
</style>