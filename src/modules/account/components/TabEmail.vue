<template>
    <card-tab class="settings-information space-y-10" :active="active">
        <div class="si-form flex flex-col space-y-4">
            <input-group id="email" title="Email">
                <custom-input name="email" placeholder="Email" />
            </input-group>

            <div class="si-group">
                <btn size="xl" class="active">
                    Save
                </btn>
            </div>
        </div>
    </card-tab>
</template>

<script>
import CardTab from '@/common/components/elements/CardTab.vue'
import CustomInput from './elements/Input.vue'
import InputGroup from './elements/InputGroup.vue'
import Btn from '@/common/components/elements/button/Btn.vue'
export default {
    components: {
        CardTab,
        CustomInput,
        InputGroup,
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
