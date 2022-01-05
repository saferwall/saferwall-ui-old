const APP_CONFIGS = {
    apiURL: process.env.API_BASE_URL || process.env.VUE_APP_API_BASE_URL,
    isProd: process.env.NODE_ENV === 'production'
}


export default APP_CONFIGS;