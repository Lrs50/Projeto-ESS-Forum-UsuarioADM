import { User } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

import Logger from '@ptkdev/logger'
import { ArrayToMap, MapToArray, MapValuesToArray } from '../utils'

const log = new Logger()

class UsersDB {
    db: Map<string, User>
    path: string

    constructor(path: string = './data.json') {
        this.path = path

        let content: string = readFileSync(Path.resolve(__dirname, this.path), { encoding: 'utf8', flag: 'r' })

        let tempArr: any[] = JSON.parse(content)

        if (!Array.isArray(tempArr)) {
            log.error('Failed to parse data file!')
            throw new Error()
        }

        this.db = ArrayToMap(tempArr)
    }

    login(username: string, password: string): User | undefined {
        this.db.forEach((user: User) => {
            if (user.username == username && user.password == password) {
                return user
            }
        })

        return undefined
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
