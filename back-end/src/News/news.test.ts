import { News } from '../../../common/types'
import { validator } from './controller'
import NewsDB from './news'

// Testes devem ser criados como [instancia].test.ts */
// Estude JEST e a sua linguagem
// Estude JASMINE para o front-end

describe('News backend', () => {
    let database: NewsDB

    beforeAll(() => {
        database = new NewsDB('./data.test.json')
    })

    test('The database path should be correct', () => {
        expect(database.path).toBe('./data.test.json')
    })

    test('The database should be loaded', () => {
        expect(database.db).not.toBeNull()
        expect(database.db).not.toBeUndefined()
    })

    test('The database should return undefined if the user doenst exist during getNews', () => {
        let result: News | undefined = database.getNews('fake-id')

        expect(result).toBeUndefined()
    })

    test('The database should be able to create a News', async () => {
        const spy = jest.spyOn(database, 'saveNews')

        let tempNews: News = {
            id: 'fake-id',
            authorId: 'fake-id',
            cover: 'fake-cover',
            title: 'fake-title',
            date: 'fake-date',
            description: 'fake-description',
            markdownText: 'fake-markdown',
            edited: false,
            views: 0,
            likes: [],
            comments: [],
            tags: [],
        }

        let result: Boolean = await database.createNews(tempNews)

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to get a News', async () => {
        const spy = jest.spyOn(database, 'getNews')

        let result: News | undefined = database.getNews('fake-id')

        expect(spy).toBeCalled()
        expect(result).not.toBeUndefined()
    })

    test('The database should not be able to get a News that doesnt exists', async () => {
        const spy = jest.spyOn(database, 'getNews')

        let result: News | undefined = database.getNews('fake-id-not-present')

        expect(spy).toBeCalled()
        expect(result).toBeUndefined()
    })

    test('The database should support pagination', async () => {
        const spy = jest.spyOn(database, 'getNewsPage')

        let result: News[] = database.getNewsPage(1, 5)

        expect(spy).toBeCalled()
        expect(result.length).toBe(1)
    })

    test('The database shouldnt be able to edit News that doenst exists', async () => {
        const spy = jest.spyOn(database, 'saveNews')

        let result: Boolean = await database.editNews('fake-id-not-existent', {
            id: 'fake-id',
            authorId: 'fake-id',
            cover: 'fake-cover',
            title: 'fake-title',
            date: 'fake-date',
            description: 'fake-description',
            markdownText: 'fake-markdown',
            edited: false,
            views: 0,
            likes: [],
            comments: [],
            tags: [],
        } as News)

        expect(spy).not.toBeCalled()
        expect(result).not.toBeTruthy()
    })

    test('The database should be able to edit News', async () => {
        const spy = jest.spyOn(database, 'saveNews')

        let result: Boolean = await database.editNews('fake-id', {
            id: 'fake-id',
            authorId: 'fake-id',
            cover: 'fake-cover',
            title: 'fake-title-edited',
            date: 'fake-date',
            description: 'fake-description',
            markdownText: 'fake-markdown',
            edited: false,
            views: 0,
            likes: [],
            comments: [],
            tags: [],
        } as News)

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to add a view', async () => {
        let result: Boolean = await database.addView('fake-id')

        let find: News | undefined = database.getNews('fake-id')

        expect(result).toBeTruthy()
        expect(find?.views).toBe(1)
    })

    test('The database shouldnt be able to delete News that doenst exists', async () => {
        const spy = jest.spyOn(database, 'saveNews')

        let result: Boolean = await database.deleteNews('fake-id-not-existent')

        expect(spy).not.toBeCalled()
        expect(result).not.toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to delete a News', async () => {
        const spy = jest.spyOn(database, 'saveNews')

        let result: Boolean = await database.deleteNews('fake-id')

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
