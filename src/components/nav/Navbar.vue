<script lang="ts" setup>
import { watch, shallowRef } from "vue";
import { useRoute } from "vue-router";

import Logo from "@/components/ui/Logo.vue";
import MenuDefault from "@/components/nav/menu/Default.vue";

const search = shallowRef(null);
const error = shallowRef(false);
const menu = shallowRef(MenuDefault);
const route = useRoute();

const loggedIn: boolean = false;

watch(
  () => route?.meta,
  async (meta) => {
    try {
      const component = await import(`./menu/${meta.menu || "Default"}.vue`);
      menu.value = component?.default || MenuDefault;
    } catch (e) {
      menu.value = MenuDefault;
    }

    return { menu };
  },
  { immediate: true }
);

const searchFileBySha256 = ({ target }: any) => {
  const sha256 = target.value;
  search.value = null;

  if (sha256 && !sha256.match(/\b[A-Fa-f0-9]{64}\b/)) {
    error.value = true;
    return;
  }

  error.value = false;

  if (sha256) {
    search.value = sha256;
  }
};
const moveToSearchedFile = () => {
  console.log("Move to file: ", search);
};
</script>

<template>
  <div
    class="
      flex
      items-center
      flex-shrink-0
      justify-center
      h-full
      w-full
      md:w-60
      lg:w-72
    "
  >
    <logo />
  </div>
  <div class="hidden items-center flex-grow md:flex">
    <input
      name="search"
      class="p-5 px-8 focus:outline-none"
      :class="error ? 'border border-red-500' : ''"
      placeholder="Quik file hash lookup"
      @keyup="searchFileBySha256($event)"
      @change="searchFileBySha256($event)"
      @keyup.enter="moveToSearchedFile()"
    />
    <button
      class="p-5 text-gray-400 hover:text-primary"
      @click="moveToSearchedFile()"
    >
      <svg
        class="inline"
        xmlns="http://www.w3.org/2000/svg"
        width="19.587"
        height="19.591"
        viewBox="0 0 19.587 19.591"
      >
        <path
          id="Search"
          d="M18.774,17.928l-4.591-4.591a8.061,8.061,0,1,0-.8.8l4.591,4.591a.569.569,0,0,0,.4.168.552.552,0,0,0,.4-.168A.566.566,0,0,0,18.774,17.928ZM1.177,8.055A6.924,6.924,0,1,1,8.1,14.983,6.932,6.932,0,0,1,1.177,8.055Z"
          transform="translate(0.3 0.35)"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        />
      </svg>
    </button>
  </div>
  <div class="justify-self-end px-8 flex-shrink-0 hidden md:flex">
    <component :is="menu" :loggedIn="loggedIn"></component>
  </div>
</template>

