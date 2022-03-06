<template>
  <div class="logo">
    <logo />
  </div>
  <div class="search">
    <input
      :class="error ? 'border border-red-500' : ''"
      name="search"
      placeholder="Quik file hash lookup"
      @keyup="searchFileBySha256($event)"
      @change="searchFileBySha256($event)"
      @keyup.enter="moveToSearchedFile()"
    />
    <button class="button" @click="moveToSearchedFile()">
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
          fill="#bfbfbf"
          stroke="#bfbfbf"
          stroke-width="0.7"
        />
      </svg>
    </button>
  </div>
  <div class="menu">
    <component :is="menu" :loggedIn="loggedIn"></component>
  </div>
</template>

<script>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

import { authGetters } from "@/state/helpers";
import Logo from "@/common/components/elements/Logo.vue";
import MenuDefault from "@/common/components/menu/Default.vue";

export default {
  components: {
    Logo,
  },
  computed: {
    ...authGetters,
  },
  setup() {
    const search = shallowRef(null);
    const error = shallowRef(false);
    const menu = shallowRef(MenuDefault);
    const route = useRoute();

    watch(
      () => route.meta,
      async (meta) => {
        try {
          const component = await import(
            `@/common/components/menu/${meta.menu}.vue`
          );
          menu.value = component?.default || MenuDefault;
        } catch (e) {
          menu.value = MenuDefault;
        }

        return { menu };
      },
      { immediate: true }
    );
    return { menu, error, search };
  },
  methods: {
    searchFileBySha256({ target }) {
      const sha256 = target.value;
      this.search = null;

      if (sha256 && !sha256.match(/\b[A-Fa-f0-9]{64}\b/)) {
        this.error = true;
        return;
      }

      this.error = false;

      if (sha256) {
        this.search = sha256;
      }
    },
    moveToSearchedFile() {
      if (this.search) {
        this.$router.push({
          name: "file-summary",
          params: { id: this.search },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  @apply w-full md:w-sidebar  md:px-6 px-5 flex justify-center md:justify-start text-black font-extrabold;
  border-right: 1px solid $border-color;
  height: 100%;
}

.search {
  @apply flex hidden lg:flex md:w-5/12 sm:w-min;

  input {
    @apply md:w-full sm:w-min h-full px-6;
    @apply focus:outline-none;
  }

  .button {
    @apply px-8 flex items-center content-center;
  }
}

.menu {
  @apply flex items-center w-full h-full ml-auto content-center w-max sm:justify-end hidden md:flex;

  .menu-content {
    @apply lg:flex lg:items-stretch lg:justify-end h-full;
  }
}
</style>


<style lang="scss" >
.menu {
  .btn-menu {
    @apply text-gray-medium relative py-2 px-4 leading-normal text-black no-underline flex items-center;

    height: 100%;
    justify-content: center;
    text-align: center;
    min-width: 100px;
    font-weight: 400;

    &.btn-signup {
      font-weight: 700;
      color: $light-color;
      background: $secondary-color;
    }

    &.btn-border {
      &::before {
        content: " ";
        height: 51%;
        border-left: 1px solid $border-color;
        margin-top: 2%;
        margin-right: 15px;
        margin-left: -15px;
      }
    }
    &.btn-login {
      @apply px-6;

      font-weight: 700;
      color: $secondary-color;
    }
  }
}
</style>