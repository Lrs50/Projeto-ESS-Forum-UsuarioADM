import { User } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

class UsersDB {
    db: User[] = []
    path: string

    constructor(path: string = './data.json') {
        this.path = path

        let content: string = readFileSync(Path.resolve(__dirname, this.path), { encoding: 'utf8', flag: 'r' })

        this.db = JSON.parse(content)

        if (!Array.isArray(this.db)) {
            throw Error('Failed to parse data file!')
        }
    }

    login(name: string, password: string): User | undefined {
        for (let i = 0; i < this.db.length; i++) {
            if (this.db[i].name == name && this.db[i].password == password) {
                return this.db[i]
            }
        }

        return undefined
    }

    getUser(id: string): User | undefined {
        return this.db.find((user) => user.id == id)
    }

    getAllUsers(): User[] {
        return this.db
    }

    createUser(user: User): Promise<Boolean> {
        this.db.unshift(user)
        let result: Promise<Boolean> = this.saveUsers()

        return result
    }

    async saveUsers(): Promise<Boolean> {
        try {
            await promises.writeFile(Path.resolve(__dirname, this.path), JSON.stringify(this.db), {
                flag: 'w',
            })

            return true
        } catch (err) {
            console.log(err)

            return false
        }
    }
}

export default UsersDB
