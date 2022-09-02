import { Request, Response } from 'express'
import CommentsDB from './comments'
import { HTTP_SUCCESS, HTTP_BAD_REQUEST, HTTP_ERROR, HTTP_NOT_FOUND, ApiResponse, Comment } from '../../../common/types'
import Logger from '@ptkdev/logger'

const log = new Logger()

export function validator(fields: string[], params: Object): Boolean {
    // Checagem dos parametros da requisição HTTP
    for (var i = 0; i < fields.length; i++) {
        if (params.hasOwnProperty(fields[i]) === false) return false
    }

    return true
}

export function getComment(request: Request, response: Response): void {
    log.info('GetNews request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: CommentsDB = new CommentsDB()

    let result: Comment | undefined = db.getComment(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function addComment(request: Request, response: Response): void {
    log.info('AddComment request received')

    const valid = validator(['id', 'authorInfo', 'content', 'Comments', 'disComments'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: CommentsDB = new CommentsDB()

    let addComment: Promise<Boolean> = db.createComment(request.body as Comment)

    addComment.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function removeComment(request: Request, response: Response): void {
    log.info('RemoveComment request received')

    const valid = validator(['id'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: CommentsDB = new CommentsDB()

    let removeComment: Promise<Boolean> = db.deleteComment(request.body.id)

    removeComment.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function addLike(request: Request, response: Response): void {
    log.info('AddView request received')

    const valid = validator(['commentId', 'authorId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: CommentsDB = new CommentsDB()

    let addView: Promise<Boolean> = db.addLike(request.body.commentId, request.body.authorId)

    addView.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function removeLike(request: Request, response: Response): void {
    log.info('AddView request received')

    const valid = validator(['commentId', 'authorLikeId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: CommentsDB = new CommentsDB()

    let addView: Promise<Boolean> = db.removeLike(request.body.commentId, request.body.authorLikeId)

    addView.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}
