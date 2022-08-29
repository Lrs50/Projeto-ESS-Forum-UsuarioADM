import { User } from '../../../common/types'
import { promises } from 'fs'
import Data from './data.json'

class UsersDB {
    db: User[] = []

    constructor() {
        this.db = Data
    }

    getUsers(id: string): User | undefined {
        return this.db.find((User) => User.id == id)
    }

    createUsers(User: User): void {
        this.db.push(User)
    }

    deleteUsers(id: string): void {
        this.db = this.db.filter((User) => User.id == id)
    }

    editUsers(id: string, User: User): void {
        this.deleteUsers(id)

        this.createUsers(User)
    }

    async saveUsers(): Promise<void> {
        try {
            await promises.writeFile('./data.json', this.db.toString(), {
                flag: 'w',
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export default UsersDB
