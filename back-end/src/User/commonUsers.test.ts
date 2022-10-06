import { User } from '../../../common/types'
import { validator } from './controller'
import UsersDB from './users'

// Testes devem ser criados como [instancia].test.ts */
// Estude JEST e a sua linguagem
// Estude JASMINE para o front-end

describe('News backend', () => {
    let database: UsersDB

    beforeAll(() => {
        database = new UsersDB()
    })

    test('The database path should be correct', () => {
        expect(database.path).toBe('./data.test.json')
    })

    test('The database should be loaded', () => {
        expect(database.db).not.toBeNull()
        expect(database.db).not.toBeUndefined()
    })

    test('The database should return undefined if the user doenst exist during getUserCommon', () => {
        let result: User | undefined = database.getUserCommon('fake-id')

        expect(result).toBeUndefined()
    })
     
    test('The database should be able to create a common User', async () => {
        const spy = jest.spyOn(database, 'saveUsers')

        let tempUser: User = {
            id: 'fake-id',
            username: 'fake-username',
            name: 'fake-name',
            aboutme:'fake-aboutme',
            password:'fake-password',
            type:'User',
            cover:'fake-cover',
            avatar:'fake-avatar',
            profileComments:[],
        }

        let result: Boolean = await database.createUser(tempUser)

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to get a commonUser', async () => {
        const spy = jest.spyOn(database, 'getUserCommon')

        let result: User | undefined = database.getUserCommon('fake-id')

        expect(spy).toBeCalled()
        expect(result).not.toBeUndefined()
    })

    test('The database should not be able to get a common User that doesnt exists', async () => {
        const spy = jest.spyOn(database, 'getUserCommon')

        let result: User | undefined = database.getUserCommon('fake-id-not-present')

        expect(spy).toBeCalled()
        expect(result).toBeUndefined()
    })
//refactoring
    // test('The database should support pagination', async () => {
    //     const spy = jest.spyOn(database, 'getNewsPage')

    //     let result: News[] = database.getNewsPage(1, 5)

    //     expect(spy).toBeCalled()
    //     expect(result.length).toBe(1)
    // })

    test('The database shouldnt be able to edit a User that doenst exists', async () => {
        const spy = jest.spyOn(database, 'saveUsers')

        let result: Boolean = await database.editUser( {
            id: 'fake-id-not-existent',
            username: 'fake-username',
            name: 'fake-name',
            aboutme:'fake-aboutme',
            password:'fake-password',
            type:'User',
            cover:'fake-cover',
            avatar:'fake-avatar',
            profileComments:[],
        })

        expect(spy).not.toBeCalled()
        expect(result).not.toBeTruthy()
    })

    test('The database should be able to edit a existent common user', async () => {
        const spy = jest.spyOn(database, 'saveUsers')

        let result: Boolean = await database.editUser({
            id: 'fake-id',
            username: 'fake-username-number2',
            name: 'fake-name',
            aboutme:'fake-aboutme',
            password:'fake-password',
            type:'User',
            cover:'fake-cover',
            avatar:'fake-avatar',
            profileComments:[],
        })

        expect(spy).toBeCalled()
        expect(result).toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database shouldnt be able to delete News that doenst exists', async () => {
        const spy = jest.spyOn(database, 'saveUsers')

        let result: Boolean = await database.deleteCommonUser('fake-id-not-existent')

        expect(spy).not.toBeCalled()
        expect(result).not.toBeTruthy()
        expect(database.db.size).toBe(1)
    })

    test('The database should be able to delete a News', async () => {
        const spy = jest.spyOn(database, 'saveUsers')

        let result: Boolean = await database.deleteCommonUser('fake-id')

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
