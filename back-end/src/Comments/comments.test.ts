import { Comment } from '../../../common/types'
import { validator } from './controller'
import CommentDB from './comments'

// Testes devem ser criados como [instancia].test.ts */
// Estude JEST e a sua linguagem
// Estude JASMINE para o front-end

describe('Comments backend', () => {
    let database: CommentDB

    beforeAll(() => {
        database = new CommentDB('./data.test.json')
    })

    test('The database path should be correct', () => {
        expect(database.path).toBe('./data.test.json')
    })

    test('The database should be loaded', () => {
        expect(database.db).not.toBeNull()
        expect(database.db).not.toBeUndefined()
    })

    test('The database should return undefined if the user doenst exist during getLike', () => {
        let result: Comment | undefined = database.getComment('fake-id')

        expect(result).toBeUndefined()
    })

    test('The database should be able to create a comment', async () => {
        const spy = jest.spyOn(database, 'saveComments')

        let comment: Comment = {
            id: 'comment-id',
            authorInfo: {
                avatar: '',
                name: '',
                id: '',
            },
            content: 'string',
            likes: [],
            dislikes: [],
        }

        let result: Boolean = await database.createComment(comment)

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to get a comment', async () => {
        let result: Comment | undefined = database.getComment('comment-id')

        expect(result).not.toBeUndefined()
    })

    test('The database should not be able to get a comment that doesnt exists', async () => {
        let result: Comment | undefined = database.getComment('fake-id-not-present')

        expect(result).toBeUndefined()
    })

    test('The database should be able to add a like', async () => {
        let result: Boolean = await database.addLike('comment-id', 'fake-id')

        let find: Comment | undefined = database.getComment('comment-id')

        expect(result).not.toBeUndefined()
        expect(find?.likes.length).toBe(1)
    })

    test('The database should be able to remove a like', async () => {
        let result: Boolean = await database.removeLike('comment-id', 'fake-id')

        let find: Comment | undefined = database.getComment('comment-id')

        expect(result).not.toBeUndefined()
        expect(find?.likes.length).toBe(0)
    })

    test('The database should not be able to delete a comment that doesnt exists', async () => {
        let result: Boolean = await database.deleteComment('comment-id-not-present')

        expect(result).toBeFalsy()
    })

    test('The database should be able to delete a comment', async () => {
        let result: Boolean = await database.deleteComment('comment-id')

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
