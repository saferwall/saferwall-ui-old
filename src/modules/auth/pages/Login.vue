<template>
  <div class="auth-card">
    <form method="POST" class="w-full" @submit="formSubmited">
      <div class="header flex my-3">
        <h2 class="title text-3xl font-semibold">Login</h2>
      </div>
      <div class="content mt-8">
        <template v-if="errors.length > 0">
          <alert type="danger">{{ errors[0] }}</alert>
        </template>
        <div class="form-group w-full my-4">
          <input
            autocomplete="login-username"
            v-model="username"
            type="text"
            class="form-input"
            placeholder="Username"
            required
          />
        </div>
        <password v-model="password" placeholder="Password" required />

        <div class="text-sm form-group justify-end py-2">
          <router-link class="forgot-link" to="/auth/forgot-password">Forgot password ?</router-link>
        </div>
        <div class="form-group">
          <button class="btn-submit">Login</button>
        </div>

        <div class="text-sm form-group justify-center py-2">
          <router-link class="resend-link" to="/auth/confirmation">
            Didn’t confirm registration?
            <span>Click here !</span>
          </router-link>
        </div>
        <div class="form-group justify-center pt-3">
          Not a member ?
          <router-link class="text-primary font-bold mx-2" to="/auth/register">Create your account</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { authMethods } from "@/state/helpers";

import Alert from "@/common/components/elements/Alert.vue";
import Password from "@/common/components/elements/inputs/Password.vue";

export default {
  components: {
    Password,
    Alert,
  },
  data() {
    return {
      username: null,
      password: null,
      errors: [],
    };
  },
  methods: {
    ...authMethods,
    formSubmited: function (e) {
      const { username, password } = this;

      e.preventDefault();

      this.errors = [];

      this.logIn({ username, password })
        .then(() => {
          this.$router.push(
            this.$route.query.redirectFrom || {
              name: "profile",
            }
          );
        })
        .catch((error) => {
          this.errors.push(
            (error.response && error.response.data.message) ||
              "Something wrong !"
          );
        });
    },
  },
};
</script>

<style scoped>
.resend-link {
  font-weight: 500;
  font-size: 0.85rem;
}
.forgot-link {
  font-weight: 500;
  font-size: 0.85rem;
}
</style>