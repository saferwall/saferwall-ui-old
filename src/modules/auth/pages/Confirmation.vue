<template>
  <div class="auth-card">
    <message
      v-if="sent"
      icon="mail"
      title="Confirm your registration"
      message="We’ve sent a link to the email you specified."
      button="Check my email"
    />
    <message
      v-else-if="confirmed"
      title="Congratulation !"
      message="Your registration has been confirmed."
      button="Login"
    />
    <form v-else method="POST" @submit="resetFormSubmited" class="w-full">
      <div class="header flex flex-col space-y-4 my-3">
        <h2 class="title text-3xl font-semibold">Didn’t confirm registration ?</h2>
        <p class="text-gray-medium">
          Enter your account email address and we’ll
          <br />send you a link to confirm your email.
        </p>
      </div>
      <template v-if="errors.length > 0">
        <alert type="danger">{{ errors[0] }}</alert>
      </template>
      <div class="content mt-8 mb-16">
        <div class="form-group w-full my-4">
          <input type="text" class="form-input" v-model="email" required placeholder="Email" />
        </div>
        <div class="form-group">
          <button class="btn-submit">Send Confirmation</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { authMethods } from "@/state/helpers";

import Message from "@/common/components/elements/Message.vue";
export default {
  data() {
    return {
      email: null,
      sent: false,
      confirmed: false,
      errors: [],
    };
  },
  methods: {
    ...authMethods,
    resetFormSubmited: function (e) {
      const { email } = this;

      e.preventDefault();

      this.resendConfirmation({ email })
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
  components: {
    Message,
  },
};
</script>
