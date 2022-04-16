import Config from "./config"

describe('config', () => {
    test('invalid key name', () => {
        // Configuration: There is no key named "invalid_key"
        expect(Config.value('invalid_key')).toBeUndefined()

        // Configuration: Environment variable "VUE_APP_BASE_URI" is not defined
        expect(Config.value('baseURI')).toBeUndefined()

        // TODO: Configuration: Value for undef is not defined
        // expect(Config.value('undef')).toBeUndefined()

        expect(Config.value('isProd')).toBeFalsy()
    })


    test('valid config', () => {
        const apiURL = 'http://api.local/v1/';

        process.env.VUE_APP_API_BASE_URL = apiURL;
        expect(Config.value('apiURL')).toEqual(apiURL)

        process.env.NODE_ENV = 'production';
        expect(Config.value('isProd')).toBeTruthy()
    })

})
