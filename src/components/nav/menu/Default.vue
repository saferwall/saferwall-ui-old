<script setup lang="ts">
const props = defineProps({
  loggedIn: {
    default: false,
    type: Boolean,
  },
});
</script>

<template>
  <ul class="flex items-center space-x-8 h-full">
    <li>
      <router-link to="/hot-activities" class="btn-menu">
        Hot activities
      </router-link>
    </li>

    <li>
      <a href="https://about.saferwall.com/" target="_blank" class="btn-menu">
        About
      </a>
    </li>

    <template v-if="loggedIn">
      <li>Member Dropmenu</li>
    </template>

    <template v-else>
      <li>
        <router-link to="/auth/login" class="btn-menu btn-login btn-border">
          Login
        </router-link>
      </li>
      <li>
        <router-link to="/auth/register" class="btn-menu btn-signup">
          Sign up
        </router-link>
      </li>
    </template>
  </ul>
</template>