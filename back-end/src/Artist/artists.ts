import { Artist, Tag } from '../../../common/types'
import { readFileSync, promises } from 'fs'
import Path from 'path'
import AppConfig from '../app.config.json'

// Definição da classe da database que vai ler e escrever no arquivo data.json
// Cada função é responsável por uma tarefa especifica

import Logger from '@ptkdev/logger'
import { ArrayToMap, defaultTags, MapToArray, MapValuesToArray } from '../utils'

const log = new Logger()

class ArtistDB {
    db: Map<string, Artist>
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

    getArtist(id: string): Artist | undefined {
        return this.db.get(id)
    }

    getAllArtists(): Artist[] {
        return MapValuesToArray(this.db)
    }

    getSize(): number {
        return this.db.size
    }

    createArtist(artist: Artist): Promise<Boolean> {
        this.db.set(artist.id, artist)

        let result: Promise<Boolean> = this.saveArtists()

        return result
    }

    editArtist(artist: Artist): Promise<Boolean> {
        let find: Artist | undefined = this.db.get(artist.id)

        if (find == undefined) {
            return new Promise<Boolean>((resolve) => {
                resolve(false)
            })
        }

        this.db.set(find.id, artist)

        let result: Promise<Boolean> = this.saveArtists()

        return result
    }

    getTags(): Tag[] {
        let tags: Tag[] = defaultTags

        this.db.forEach((artist: Artist) => {
            tags.push({ content: artist.name, color: 'magenta' })
        })

        return tags
    }

    async saveArtists(): Promise<Boolean> {
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

export default ArtistDB
