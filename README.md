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

### Project setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn serve
```

#### Compiles and minifies for production

```
yarn build
```

#### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
