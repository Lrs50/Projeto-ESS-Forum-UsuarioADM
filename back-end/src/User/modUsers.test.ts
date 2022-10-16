import { User } from '../../../common/types'
import { validator } from './controller'
import UsersDB from './users'

// Testes devem ser criados como [instancia].test.ts */
// Estude JEST e a sua linguagem
// Estude JASMINE para o front-end
// npm run test:modUsers

describe('Mod User backend', () => {
    let database: UsersDB

    beforeAll(() => {
        database = new UsersDB()
    })

    test('The database path should be correct', () => {
        expect(database.path).toBe('./data.testBack.json')
    })

    test('The database should be loaded', () => {
        expect(database.db).not.toBeNull()
        expect(database.db).not.toBeUndefined()
    })

    test('The database should return undefined if the user doenst exist during getUserMod', () => {
        let result: User | undefined = database.getUserMod('fake-id')

        expect(result).toBeUndefined()
    })

    test('The database should be able to get a Mod', async () => {
        const spy = jest.spyOn(database, 'getUserMod')
        let tempUser: User = {
            id: 'mod-user',
            username: 'fake-mod-username',
            name: 'fake-mod-name',
            aboutme:'fake-mod-aboutme',
            password:'fake-mod-password',
            type:'Mod',
            cover:'fake-mod-cover',
            avatar:'fake-mod-avatar',
            profileComments:[],
        }

        await database.createUser(tempUser)

        let result: User | undefined = database.getUserMod('mod-user')

        expect(spy).toBeCalled()
        expect(result).not.toBeUndefined()
    })

    test('The database should not be able to get a Mod  that doesnt exists', async () => {
        const spy = jest.spyOn(database, 'getUserMod')

        let result: User | undefined = database.getUserMod('fake-id-not-present')

        expect(spy).toBeCalled()
        expect(result).toBeUndefined()
    })

    test('The database should support pagination', async () => {
        let tempUser: User = {
            id: 'adm-user',
            username: 'fake-adm-username',
            name: 'fake-adm-name',
            aboutme:'fake-adm-aboutme',
            password:'fake-adm-password',
            type:'Admin',
            cover:'fake-mod-cover',
            avatar:'fake-mod-avatar',
            profileComments:[],
        }

        await database.createUser(tempUser)

        const spy = jest.spyOn(database, 'getUserAdminPage')

        let result: User[] = database.getUserAdminPage(1, 5, '')

        expect(spy).toBeCalled()
        expect(result.length).toBe(1)
        await database.deleteUser('adm-user')
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
