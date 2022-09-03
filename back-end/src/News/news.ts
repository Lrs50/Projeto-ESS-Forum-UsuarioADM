import { Comment, Like, News } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'
import { ArrayToMap, MapToArray, MapValuesToArray } from '../utils'
import Logger from '@ptkdev/logger'

const log = new Logger()

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

class NewsDB {
    db: Map<string, News> = new Map<string, News>()
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

    getSize(): number {
        return this.db.size
    }

    getNews(id: string): News | undefined {
        return this.db.get(id)
    }

    getAllNews(): News[] {
        return MapValuesToArray(this.db)
    }

    getNewsPage(pageId: number, newsPerPage: number): News[] {
        let tempArr: News[] = MapValuesToArray(this.db)

        return tempArr.slice((pageId - 1) * newsPerPage, Math.min(pageId * newsPerPage, this.db.size))
    }

    createNews(news: News): Promise<Boolean> {
        this.db.set(news.id, news)

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    deleteNews(id: string): Promise<Boolean> {
        let find: Boolean = this.db.delete(id)

        if (find == false) {
            return new Promise<Boolean>((resolve, reject) => {
                resolve(false)
            })
        }

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    editNews(id: string, news: News): Promise<Boolean> {
        let find: News | undefined = this.db.get(id)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(id, news)

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    addView(id: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(id)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, {
            ...find,
            views: find.views + 1,
        } as News)

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    addLike(newsId: string, authorId: Like): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, {
            ...find,
            likes: find.likes.concat([authorId]),
        } as News)

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    removeLike(newsId: string, authorId: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, {
            ...find,
            likes: find.likes.filter((value) => {
                return value != authorId
            }),
        } as News)

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    addComment(newsId: string, comment: Comment): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, {
            ...find,
            comments: [...find.comments, comment],
        })

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    removeComment(newsId: string, comment: Comment): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, {
            ...find,
            comments: find.comments.filter((value: Comment) => {
                return value.id != comment.id
            }),
        })

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    async saveNews(): Promise<Boolean> {
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

export default NewsDB
