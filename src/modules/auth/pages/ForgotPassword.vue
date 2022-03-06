<template>
  <div class="auth-card">
    <message
      v-if="sent"
      icon="mail"
      title="Email sent"
      message="If your email is in our system, you will receive instructions to reset your password shortly."
    />
    <form
      v-else-if="reset"
      method="POST"
      class="w-full"
      @submit="saveFormSubmited"
    >
      <div class="header flex flex-col space-y-4 my-3">
        <h2 class="title text-3xl font-semibold">Reset your password</h2>
        <p class="text-gray-medium">
          Password must be at least 8 characters long.
        </p>
      </div>
      <template v-if="errors.length > 0">
        <alert type="danger">{{ errors[0] }}</alert>
      </template>
      <div class="content mt-8 mb-16">
        <password
          placeholder="New password"
          name="password"
          v-model="password"
          required
        />
        <password
          placeholder="Retype new password"
          name="confirm_password"
          v-model="confirm_password"
          required
        />

        <div class="form-group">
          <button class="btn-submit">Reset Password</button>
        </div>
      </div>
    </form>
    <form v-else method="POST" class="w-full" @submit="resetFormSubmited">
      <div class="header flex flex-col space-y-4 my-3">
        <h2 class="title text-3xl font-semibold">Forgot password</h2>
        <p class="text-gray-medium">
          Enter your account email address and we’ll <br />
          send you a link to reset your password.
        </p>
      </div>
      <template v-if="errors.length > 0">
        <alert type="danger">{{ errors[0] }}</alert>
      </template>
      <div class="content mt-8 mb-16">
        <div class="form-group w-full my-4">
          <input
            type="text"
            class="form-input"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <button class="btn-submit">Reset Password</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { authMethods } from "@/state/helpers";

import Alert from "@/common/components/elements/Alert.vue";
import Message from "@/common/components/elements/Message.vue";
import Password from "@/common/components/elements/inputs/Password.vue";

export default {
  components: {
    Message,
    Password,
    Alert,
  },
  data() {
    return {
      guid: null,
      token: null,
      email: null,
      password: null,
      confirm_password: null,
      sent: false,
      reset: false,
      errors: [],
    };
  },
  methods: {
    ...authMethods,
    resetFormSubmited: function (e) {
      const { email } = this;

      e.preventDefault();

      this.resetPassword({ email })
        .then(() => {
          this.sent = true;
        })
        .catch((error) => {
          this.errors.push(
            (error.response && error.response.data.message) ||
              "Something wrong !"
          );
        });
    },
    saveFormSubmited: function (e) {
      const { token, guid, password, confirm_password } = this;

      e.preventDefault();

      this.errors = [];
      if (password != confirm_password)
        this.errors.push("Confirm password incorrect.");

      if (this.errors.length > 0) return true;

      this.savePassword({ guid, token, password })
        .then(() => {
          this.$router.redirect("/auth/login");
        })
        .catch((error) => {
          this.errors.push(
            (error.response && error.response.data.message) ||
              "Something wrong !"
          );
        });
    },
  },
  mounted() {
    if (this.$route.params.token) {
      this.reset = true;
      this.token = this.$route.params.token;
    }
  },
};
</script>
