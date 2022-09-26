import { Artist, Comment, Like, News } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'
import { ArrayToMap, MapToArray, MapValuesToArray } from '../utils'
import Logger from '@ptkdev/logger'
import AppConfig from '../app.config.json'
import ArtistDB from '../Artist/artists'

const log = new Logger()

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

class NewsDB {
    db: Map<string, News> = new Map<string, News>()
    path: string

    constructor() {
        if (AppConfig.MODE == 'DEV' || AppConfig.MODE == 'PROD') {
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

    getNews(id: string): News | undefined {
        return this.db.get(id)
    }

    getAllNews(): News[] {
        return MapValuesToArray(this.db)
    }

    getNewsPage(pageId: number, newsPerPage: number, order: string, filterTerm: string | undefined): News[] {
        let tempArr: News[] = MapValuesToArray(this.db)

        let artistsDB: ArtistDB = new ArtistDB()

        if (filterTerm != '' && filterTerm != undefined) {
            let term: string = filterTerm.toLowerCase()

            tempArr = tempArr.filter((news: News) => {
                if (news.title.toLowerCase().includes(term)) {
                    return true
                }

                if (news.description.toLowerCase().includes(term)) {
                    return true
                }

                for (let i = 0; i < news.tags.length; i++) {
                    if (news.tags[i].toLowerCase().includes(term)) {
                        return true
                    }
                }

                let artists: Artist[] = []

                for (let i = 0; i < news.mention.length; i++) {
                    artists.push(artistsDB.getArtist(news.mention[i])!)
                }

                for (let i = 0; i < artists.length; i++) {
                    if (artists[i].name.toLowerCase().includes(term)) {
                        return true
                    }
                }

                return false
            })
        }

        tempArr = tempArr.slice((pageId - 1) * newsPerPage, Math.min(pageId * newsPerPage, this.db.size))

        function comparePopular(a: News, b: News): number {
            if (a.views > b.views) {
                return -1
            } else if (a.views == b.views) {
                if (a.likes.length > b.likes.length) {
                    return -1
                } else if (a.likes.length == b.likes.length) {
                    if (a.comments.length >= b.comments.length) {
                        return -1
                    } else {
                        return 1
                    }
                } else {
                    return 1
                }
            } else {
                return 1
            }
        }

        function compareNewest(a: News, b: News): number {
            function computeScore(timeStr: string): number {
                let match: string[] = timeStr.split(' ')

                let score: number = 0

                let date: string[] = match[0].split('/')
                let hour: string[] = match[1].split(':')

                score += parseFloat(hour[1]) / 60
                score += parseFloat(hour[0])
                score += parseFloat(date[0]) * 24
                score += parseFloat(date[1]) * 24 * 30
                score += parseFloat(date[2]) * 24 * 30 * 12

                return score
            }

            let scoreA: number = computeScore(a.date)
            let scoreB: number = computeScore(b.date)

            if (scoreA > scoreB) {
                return -1
            } else {
                return 1
            }
        }

        if (order == 'Popular') {
            return tempArr.sort(comparePopular)
        } else {
            return tempArr.sort(compareNewest)
        }
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

    removeComment(newsId: string, commentId: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, {
            ...find,
            comments: find.comments.filter((value: Comment) => {
                return value.id != commentId
            }),
        })

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    addLikeInComment(newsId: string, commentId: string, authorLikeId: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        for (let i = 0; i < find.comments.length; i++) {
            if (find.comments[i].id == commentId) {
                find.comments[i].likes.push(authorLikeId)
            }
        }

        this.db.set(find.id, {
            ...find,
        })

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    removeLikeInComment(newsId: string, commentId: string, authorLikeId: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        for (let i = 0; i < find.comments.length; i++) {
            if (find.comments[i].id == commentId) {
                find.comments[i].likes = find.comments[i].likes.filter((authorLike: Like) => {
                    return authorLike != authorLikeId
                })
            }
        }

        this.db.set(find.id, {
            ...find,
        })

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    addDislikeInComment(newsId: string, commentId: string, authorDislikeId: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        for (let i = 0; i < find.comments.length; i++) {
            if (find.comments[i].id == commentId) {
                find.comments[i].dislikes.push(authorDislikeId)
            }
        }

        this.db.set(find.id, {
            ...find,
        })

        let result: Promise<Boolean> = this.saveNews()

        return result
    }

    removeDislikeInComment(newsId: string, commentId: string, authorDislikeId: string): Promise<Boolean> {
        let find: News | undefined = this.db.get(newsId)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        for (let i = 0; i < find.comments.length; i++) {
            if (find.comments[i].id == commentId) {
                find.comments[i].dislikes = find.comments[i].dislikes.filter((authorLike: Like) => {
                    return authorLike != authorDislikeId
                })
            }
        }

        this.db.set(find.id, {
            ...find,
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
