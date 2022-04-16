import { getClass, defaultclass, classes } from './classification'

describe('classification', () => {
    test('getclass with null arg / invalid label', () => {
        expect(getClass(null)).toEqual(defaultclass)
        expect(getClass('test')).toEqual(defaultclass)
    })


    test('getclass test all possible cases', () => {
        Object.keys(classes).forEach(name => {
            expect(getClass(name)).toEqual(classes[name])
        })
    })
})
