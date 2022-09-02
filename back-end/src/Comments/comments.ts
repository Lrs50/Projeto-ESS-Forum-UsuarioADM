import { Comment } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'
import { ArrayToMap, MapToArray } from '../utils'

import Logger from '@ptkdev/logger'

const log = new Logger()

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

class CommentDB {
    db: Map<string, Comment> = new Map<string, Comment>()
    path: string

    constructor(path: string = './data.json') {
        this.path = path

        let content: string = readFileSync(Path.resolve(__dirname, this.path), { encoding: 'utf8', flag: 'r' })

        let tempArr: any[] = JSON.parse(content)

        if (!Array.isArray(tempArr)) {
            log.error('Failed to parse data file!')

            return
        }

        this.db = ArrayToMap(tempArr)
    }

    getComment(id: string): Comment | undefined {
        return this.db.get(id)
    }

    createComment(comment: Comment): Promise<Boolean> {
        this.db.set(comment.id, comment)

        let result: Promise<Boolean> = this.saveComments()

        return result
    }

    deleteComment(id: string): Promise<Boolean> {
        let find: boolean = this.db.delete(id)

        if (find == false) {
            return new Promise<Boolean>((resolve, reject) => {
                resolve(false)
            })
        }

        let result: Promise<Boolean> = this.saveComments()

        return result
    }

    async saveComments(): Promise<Boolean> {
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

export default CommentDB
