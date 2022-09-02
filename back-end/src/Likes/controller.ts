import { Request, Response } from 'express'
import LikesDB from './likes'
import { HTTP_SUCCESS, HTTP_BAD_REQUEST, HTTP_ERROR, HTTP_NOT_FOUND, ApiResponse, Like } from '../../../common/types'
import Logger from '@ptkdev/logger'

const log = new Logger()

export function validator(fields: string[], params: Object): Boolean {
    // Checagem dos parametros da requisição HTTP
    for (var i = 0; i < fields.length; i++) {
        if (params.hasOwnProperty(fields[i]) === false) return false
    }

    return true
}

export function getLike(request: Request, response: Response): void {
    log.info('GetNews request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: LikesDB = new LikesDB()

    let result: Like | undefined = db.getLike(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function addLike(request: Request, response: Response): void {
    log.info('AddLike request received')

    const valid = validator(['newsId', 'authorLikeId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: LikesDB = new LikesDB()

    let addLike: Promise<Boolean> = db.createLike(request.body.newsId, request.body.authorLikeId)

    addLike.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function removeLike(request: Request, response: Response): void {
    log.info('RemoveLike request received')

    const valid = validator(['authorLikeId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: LikesDB = new LikesDB()

    let removeLike: Promise<Boolean> = db.deleteLike(request.body.authorLikeId)

    removeLike.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}
