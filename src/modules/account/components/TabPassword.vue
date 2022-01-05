<template>
  <card-tab :active="active">
    <form @submit.prevent="onFormSubmited()" class="space-y-10">
      <div class="si-form flex flex-col space-y-4">
        <input-group id="password" title="Your current password">
          <input
            class="custom-input"
            name="password"
            type="password"
            autocomplete
            v-model="user.password"
            placeholder="Current Password"
          />
        </input-group>
        <input-group id="newpassword" title="New Password">
          <input
            class="custom-input"
            name="newpassword"
            type="password"
            placeholder="New Password"
            v-model="user.newpassword"
          />
        </input-group>
        <input-group id="confirmpassword" title="Repeat password">
          <input
            class="custom-input"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            v-model="user.confirmpassword"
          />
        </input-group>

        <div class="si-group">
          <btn size="xl" class="active" type="submit"> Save </btn>
        </div>
      </div>
    </form>
  </card-tab>
</template>

<script>
import InputGroup from "./elements/InputGroup.vue";
import CardTab from "@/common/components/elements/CardTab.vue";
import Btn from "@/common/components/elements/button/Btn.vue";

import { createToast } from "mosha-vue-toastify";
import { userMethods } from "@/state/helpers";

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
  data: () => ({
    user: {
      password: null,
      newpassword: null,
      confirmpassword: null,
    },
  }),
  methods: {
    ...userMethods,
    isCurrentPasswordValid() {
      return `${this.user.password}`.length >= 8;
    },
    isValidPassword() {
      return `${this.user.newpassword}`.length >= 8;
    },
    isConfirmedPassword() {
      return this.user.newpassword == this.user.confirmpassword;
    },
    onFormSubmited() {
      if (!this.isCurrentPasswordValid()) {
        createToast("Current password is required !", {
          type: "warning",
          position: "bottom-right",
        });
        return;
      }

      if (!this.isConfirmedPassword()) {
        createToast("Password confirmation is invalid !", {
          type: "warning",
          position: "bottom-right",
        });
        return;
      }

      if (!this.isValidPassword()) {
        createToast("Password is to small !", {
          type: "warning",
          position: "bottom-right",
        });
        return;
      }

      this.updatePassword(this.user).then((reset) => {
        reset && Object.keys(this.user).forEach((k) => (this.user[k] = null));
      });
    },
  },
};
</script>
