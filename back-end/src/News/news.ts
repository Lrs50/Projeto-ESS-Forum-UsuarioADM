import { News } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

class NewsDB {
    db: News[] = []
    path: string

    constructor(path: string = './data.json') {
        this.path = path

        let content: string = readFileSync(Path.resolve(__dirname, this.path), { encoding: 'utf8', flag: 'r' })

        this.db = JSON.parse(content)

        if (!Array.isArray(this.db)) {
            throw Error('Failed to parse data file!')
        }
    }

    getSize(): number {
        return this.db.length
    }

    getNews(id: string): News | undefined {
        return this.db.find((news) => news.id == id)
    }

    getAllNews(): News[] {
        return this.db
    }

    getNewsPage(pageId: number, newsPerPage: number): News[] {
        return this.db.slice((pageId - 1) * newsPerPage, Math.min(pageId * newsPerPage, this.db.length))
    }

    createNews(news: News): Promise<Boolean> {
        this.db.unshift(news)
        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    deleteNews(id: string): Promise<Boolean> {
        let find: News | undefined = this.getNews(id)

        if (find == undefined) {
            return new Promise<Boolean>((resolve, reject) => {
                resolve(false)
            })
        }

        for (var i = 0; i < this.db.length; i++) {
            if (this.db[i].id == id) {
                this.db.splice(i, 1)
                break
            }
        }

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    editNews(id: string, news: News): Promise<Boolean> {
        let find: News | undefined = this.getNews(id)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        for (var i = 0; i < this.db.length; i++) {
            if (this.db[i].id == id) {
                this.db[i] = news
                break
            }
        }

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    async saveNews(): Promise<Boolean> {
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

export default NewsDB
