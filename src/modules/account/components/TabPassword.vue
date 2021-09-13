<template>
  <card-tab class="settings-information space-y-10" :active="active">
    <div class="si-form flex flex-col space-y-4">
      <input-group id="password" title="Your current password">
        <input
          class="custom-input"
          name="password"
          placeholder="Current Password"
        />
      </input-group>
      <input-group id="newpassword" title="New Password">
        <input
          class="custom-input"
          name="newpassword"
          placeholder="New Password"
        />
      </input-group>
      <input-group id="confirmpassword" title="Repeat password">
        <input
          class="custom-input"
          name="confirmpassword"
          placeholder="Confirm Password"
        />
      </input-group>

      <div class="si-group">
        <btn size="xl" class="active"> Save </btn>
      </div>
    </div>
  </card-tab>
</template>

<script>
import CardTab from "@/common/components/elements/CardTab.vue";
import InputGroup from "./elements/InputGroup.vue";
import Btn from "@/common/components/elements/button/Btn.vue";
export default {
  components: {
    CardTab,
    InputGroup,
    Btn,
  },
  props: {
    active: {
      type: Boolean,
    },
  },
};
</script>
