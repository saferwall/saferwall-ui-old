<template>
  <div class="auth-card">
    <message
      v-if="sent"
      icon="envelope"
      title="Confirm your registration !"
      message="We’ve sent a link to the email you specified."
      button="Login"
      link="/auth/login"
    />
    <form v-else method="POST" class="w-full" @submit="formSubmited">
      <div class="header flex my-3">
        <h2 class="title text-3xl font-bold">Sign up</h2>
      </div>
      <div class="content mt-8">
        <template v-if="errors.length > 0">
          <alert type="danger">{{ errors[0] }}</alert>
        </template>
        <div class="form-group w-full my-4">
          <input
            autocomplete="username"
            type="text"
            class="form-input"
            placeholder="Username"
            v-model="username"
          />
        </div>
        <div class="form-group w-full my-4">
          <input
            autocomplete="email"
            type="email"
            class="form-input"
            placeholder="Email"
            v-model="email"
          />
        </div>

        <password placeholder="Password" v-model="password" />

        <div class="form-group justify-between py-2">
          <label for="agree">
            <input type="checkbox" name="agree" v-model="agree" id="agree" /> I
            agree to the
            <a
              class="text-primary font-bold"
              target="_blank"
              href="https://docs.saferwall.com/tos"
            >Terms of Service</a>
          </label>
        </div>
        <div class="form-group">
          <button class="btn-submit">Create account</button>
        </div>
        <div class="form-group justify-center pt-3">
          Already have an account ?
          <router-link class="text-primary font-bold mx-2" to="/auth/login">Login</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { authMethods } from "@/state/helpers";

import Password from "@/common/components/elements/inputs/Password.vue";
import Message from "@/common/components/elements/Message.vue";
import Alert from "@/common/components/elements/Alert.vue";

export default {
  components: {
    Message,
    Alert,
    Password,
  },
  data() {
    return {
      username: null,
      password: null,
      errors: [],
      agree: null,
      sent: false,
    };
  },
  methods: {
    ...authMethods,
    formSubmited: function (e) {
      e.preventDefault();

      this.errors = ["Username", "Email", "Password"]
        .map((field) =>
          !this[field.toLowerCase()] ? `${field} required.` : null
        )
        .filter((val) => val);

      if (!this.agree) {
        this.errors.push("You must agree to the terms our service");
      }

      if (this.errors.length > 0) return true;

      this.register({
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.username = null;
          this.password = null;
          this.email = null;
          this.sent = true;
        })
        .catch((error) => {
          this.errors.push(
            error.response ? error.response.data.message : "Something wrong !"
          );
        });
    },
  },
};
</script>
