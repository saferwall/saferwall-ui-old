export default class Config {
    static get CONFIG() {
        return {
            baseURI: '$VUE_APP_BASE_URI',
            apiURL: '$VUE_APP_API_BASE_URL',
            avatarURL: '$VUE_APP_AVATAR_BASE_URL',
            isProd: process.env.NODE_ENV === 'production'
        }
    }

    static value(name) {
        if (!(name in this.CONFIG)) {
            console.log(`Configuration: There is no key named "${name}"`)
            return
        }

        const value = this.CONFIG[name]
        if (!value) {
            console.log(`Configuration: Value for "${name}" is not defined`)
            return
        }

        if (value.startsWith('$VUE_APP_')) {
            // value was not replaced, it seems we are in development.
            // Remove $ and get current value from process.env
            const envName = value.substr(1)
            const envValue = process.env[envName]

            if (envValue) {
                return envValue
            } else {
                console.log(`Configuration: Environment variable "${envName}" is not defined`)
            }
        } else {
            // value was already replaced, it seems we are in production.
            return value
        }
    }
}