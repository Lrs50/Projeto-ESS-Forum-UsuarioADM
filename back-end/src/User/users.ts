import { User } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'
import AppConfig from '../app.config.json'

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

import Logger from '@ptkdev/logger'
import { ArrayToMap, MapToArray, MapValuesToArray } from '../utils'

const log = new Logger()

class UsersDB {
    db: Map<string, User>
    path: string

    constructor() {
        if(AppConfig.MODE == 'DEV' || AppConfig.MODE == 'PROD'){
            this.path = './data.json'
        } else {
            this.path = './data.test.json'
        }

        let content: string = readFileSync(Path.resolve(__dirname, this.path), { encoding: 'utf8', flag: 'r' })

        let tempArr: any[] = JSON.parse(content)

        if (!Array.isArray(tempArr)) {
            log.error('Failed to parse data file!')
            throw new Error()
        }

        this.db = ArrayToMap(tempArr)
    }

    getSize(): number {
        return this.db.size
    }

    login(username: string, password: string): User | undefined {
        let find: User | undefined = undefined

        this.db.forEach((user: User) => {
            if (find != undefined) return

            if (user.username == username && user.password == password) {
                find = user
            }
        })

        return find
    }

    getUser(id: string): User | undefined {
        return this.db.get(id)
    }

    getAllUsers(): User[] {
        return MapValuesToArray(this.db)
    }

    createUser(user: User): Promise<Boolean> {
        this.db.set(user.id, user)

        let result: Promise<Boolean> = this.saveUsers()

        return result
    }

    editUser(user: User): Promise<Boolean> {
        let find: User | undefined = this.db.get(user.id)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, user)

        let result: Promise<Boolean> = this.saveUsers()

        return result
    }

    async saveUsers(): Promise<Boolean> {
        try {
            await promises.writeFile(Path.resolve(__dirname, this.path), JSON.stringify(MapToArray(this.db)), {
                flag: 'w',
            })

            return true
        } catch (err: any) {
            log.error(err)

            return false
        }
    }
}

export default UsersDB
