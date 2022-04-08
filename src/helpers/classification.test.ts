import { getClass, defaultclass } from './classification'

describe('classification', () => {
    test('getclass with null arg / invalid label', () => {
        expect(getClass(null)).toEqual(defaultclass)
        expect(getClass('test')).toEqual(defaultclass)
    })


    test('getclass label.malicious', () => {
        expect(getClass('label.malicious')).toEqual({
            title: 'Malicious',
            icon: 'danger',
            color: 'red'
        })
    })
})
