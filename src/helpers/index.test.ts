import { mapTags, isAnAVG, generateAvatar, catchAuthThrow } from "./index";

describe('Avg', () => {
    test('invalid antivirus name', () => {
        expect(isAnAVG('test')).toBeFalsy()
        expect(isAnAVG('_')).toBeFalsy()
        expect(isAnAVG('999')).toBeFalsy()
    })

    test('valid antivirus name', () => {
        expect(isAnAVG('avast')).toBeTruthy()
    })
});


describe('Tags mapping', () => {
    test('empty map', () => {
        expect(mapTags({})).toEqual([])
        expect(mapTags({
            avira: null,
            packer: []
        })).toEqual([])
    })

    test('example of a valid map', () => {
        expect(mapTags({
            avast: "Snatch",
            avira: "CryptInject",
            packer: ["upx"],
            pe: [
                "exe"
            ],
        })).toEqual([
            { name: "Snatch", avg: true },
            { name: "CryptInject", avg: true },
            { name: "upx", avg: false },
            { name: "exe", avg: false },
        ])
    })

    test('generate avatar url', () => {
        process.env.VUE_APP_AVATAR_BASE_URL = "http://localhost/"
        expect(generateAvatar('test')).toEqual(process.env.VUE_APP_AVATAR_BASE_URL + 'test')
    })
})


describe('auth catch', () => {

    test('rethrow exception', () => {
        expect(() => catchAuthThrow('test')({ response: { status: 200 } })).toThrowError()
    })
})