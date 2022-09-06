import { Tag } from '../../common/types'

export function MapToArray(map: Map<any, any>): any[] {
    let arr: any[] = []

    map.forEach((v, k) => arr.push([k, v]))

    return arr
}

export function ArrayToMap(arr: any[]): Map<any, any> {
    let map: Map<any, any> = new Map<any, any>()

    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i][0], arr[i][1])
    }

    return map
}

export function MapValuesToArray(map: Map<any, any>): any[] {
    let arr: any[] = []

    map.forEach((v) => arr.push(v))

    return arr
}

export const defaultTags: Tag[] = [
    { content: 'RAP', color: '' },
    { content: 'TRAP', color: '' },
    { content: 'POLEMIC', color: '' },
    { content: 'INTERNACIONAL', color: '' },
]
