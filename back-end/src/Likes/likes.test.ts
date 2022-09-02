import { Like } from '../../../common/types'
import { validator } from './controller'
import LikesDB from './likes'

// Testes devem ser criados como [instancia].test.ts */
// Estude JEST e a sua linguagem
// Estude JASMINE para o front-end

describe('Likes backend', () => {
    let database: LikesDB

    beforeAll(() => {
        database = new LikesDB('./data.test.json')
    })

    test('The database path should be correct', () => {
        expect(database.path).toBe('./data.test.json')
    })

    test('The database should be loaded', () => {
        expect(database.db).not.toBeNull()
        expect(database.db).not.toBeUndefined()
    })

    test('The database should return undefined if the user doenst exist during getLike', () => {
        let result: Like | undefined = database.getLike('fake-id')

        expect(result).toBeUndefined()
    })

    test('The database should be able to create a like', async () => {
        const spy = jest.spyOn(database, 'saveLikes')

        let newsId: string = 'like-fake-id'
        let likeId: Like = 'like-id'

        let result: Boolean = await database.createLike(newsId, likeId)

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to get a like', async () => {
        let result: Like | undefined = database.getLike('like-id')

        expect(result).not.toBeUndefined()
    })

    test('The database should not be able to get a like that doesnt exists', async () => {
        let result: Like | undefined = database.getLike('fake-id-not-present')

        expect(result).toBeUndefined()
    })

    test('The database should not be able to delete a like that doesnt exists', async () => {
        let result: Boolean = await database.deleteLike('like-id-not-present')

        expect(result).toBeFalsy()
    })

    test('The database should be able to delete a like', async () => {
        let result: Boolean = await database.deleteLike('like-id')

        expect(result).toBeTruthy()
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
