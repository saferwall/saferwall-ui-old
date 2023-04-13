<template>
  <router-link to="/hot-activities" class="btn-menu">Hot activities</router-link>
  <a href="https://docs.saferwall.com/" target="_blank" class="btn-menu">About</a>
  <template v-if="loggedIn">
    <member />
  </template>
  <template v-else>
    <router-link to="/auth/login" class="btn-menu btn-login btn-border">Login</router-link>
    <router-link to="/auth/register" class="btn-menu btn-signup">Sign up</router-link>
  </template>
</template>

<script>
import Member from "./Member.vue";

export default {
  components: { Member },
  props: {
    loggedIn: {
      default: false,
      type: Boolean,
    },
  },
};
</script>