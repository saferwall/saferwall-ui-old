# Saferwall ui

The 🎨 Next UI version of Saferwall.

[![UI CI](https://github.com/saferwall/saferwall-ui/actions/workflows/build.yaml/badge.svg)](https://github.com/saferwall/saferwall-ui/actions/workflows/build.yaml)

## Docker image

If you use the built image, you will need to set the environment variables below

```ini
# optional
VUE_APP_ANALYTICS_GOOGLE_TAG="EX-00000000"

# required
VUE_APP_BASE_URI="https://saferwall.com/"
VUE_APP_API_BASE_URL="https://api.saferwall.com/v1/"

VUE_APP_AVATAR_BASE_URL="https://avatar.saferwall.com/"
```

---

## Dev mode

# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
