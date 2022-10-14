import { emptyArtist, Artist } from '../../../common/types'
import { validator } from './controller'
import artistDB from './artists'

// Testes devem ser criados como [instancia].test.ts */
// Estude JEST e a sua linguagem
// Estude JASMINE para o front-end

describe('Artist backend', () => {
    let database: artistDB

    beforeAll(() => {
        database = new artistDB()
    })

    test('The database path should be correct', () => {
        expect(database.path).toBe('./data.test.json')
    })

    test('The database should be loaded', () => {
        expect(database.db).not.toBeNull()
        expect(database.db).not.toBeUndefined()
    })

    test('The database should return undefined if the user doenst exist during getArtist', () => {
        let result: Artist | undefined = database.getArtist('fake-id')

        expect(result).toBeUndefined()
    })

    test('The database should be able to create an Artist', async () => {
        const spy = jest.spyOn(database, 'saveArtists')

        let tempArtist: Artist = emptyArtist('fake-id')

        let result: Boolean = await database.createArtist(tempArtist)

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to get an Artist', async () => {
        const spy = jest.spyOn(database, 'getArtist')

        let result: Artist | undefined = database.getArtist('fake-id')

        expect(spy).toBeCalled()
        expect(result).not.toBeUndefined()
    })

    test('The database should not be able to get an Artist that doesnt exists', async () => {
        const spy = jest.spyOn(database, 'getArtist')

        let result: Artist | undefined = database.getArtist('fake-id-not-present')

        expect(spy).toBeCalled()
        expect(result).toBeUndefined()
    })

    test('The database should support pagination', async () => {
        const spy = jest.spyOn(database, 'getArtistPage')

        let result: Artist[] = database.getArtistPage(1, 5, '')

        expect(spy).toBeCalled()
        expect(result.length).toBe(1)
    })

    test('The database should be able to add a mention', async () => {
        let result: Boolean = await database.addMention('fake-id', 1)

        let find: Artist | undefined = database.getArtist('fake-id')

        expect(result).toBeTruthy()
        expect(find?.mentions).toBe(1)
    })

    test('The database shouldnt be able to delete an Artist that doenst exists', async () => {
        const spy = jest.spyOn(database, 'saveArtists')

        let result: Boolean = await database.deleteArtist('fake-id-not-existent')

        expect(spy).not.toBeCalled()
        expect(result).not.toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to delete an Artist', async () => {
        const spy = jest.spyOn(database, 'saveArtists')

        let result: Boolean = await database.deleteArtist('fake-id')

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(0)
    })

    test('Http Validator should work properly', () => {
        let params: Object = {
            param1: 1,
            param2: 2,
        }

        let result: Boolean = validator(['param1', 'param2'], params)

        expect(result).toBeTruthy()

        result = validator(['param1', 'param3'], params)

        expect(result).toBeFalsy()
    })
})
