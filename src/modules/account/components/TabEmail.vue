<template>
  <card-tab class="settings-information space-y-10" :active="active">
    <form @submit.prevent="onFormSubmited()">
      <div class="si-form flex flex-col space-y-4">
        <input-group id="email" title="Email">
          <input
            class="custom-input"
            name="email"
            placeholder="Email"
            v-model="user.email"
          />
        </input-group>
        <input-group id="password" title="Password">
          <input
            class="custom-input"
            name="password"
            type="password"
            placeholder="Your password"
            v-model="user.password"
          />
        </input-group>

        <div class="si-group">
          <btn type="submit" size="xl" class="active"> Save </btn>
        </div>
      </div>
    </form>
  </card-tab>
</template>

<script>
import InputGroup from "./elements/InputGroup.vue";
import CardTab from "@/common/components/elements/CardTab.vue";
import Btn from "@/common/components/elements/button/Btn.vue";

import { userGetters, userMethods } from "@/state/helpers";

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
      email: null,
      password: null,
    },
  }),
  computed: {
    ...userGetters,
  },
  methods: {
    ...userMethods,
    onFormSubmited() {
      this.updateEmail(this.user).then(() => {
        this.user.password = null;
      });
    },
  },
  beforeMount() {
    let user = this.getUser;

    Object.keys(this.user).forEach((key) => {
      if (user[key]) {
        this.user[key] = user[key];
      }
    });
  },
};
</script>
