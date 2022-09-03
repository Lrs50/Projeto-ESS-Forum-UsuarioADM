import { Request, Response } from 'express'
import NewsDB from './news'
import { HTTP_SUCCESS, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_ERROR, News, ApiResponse, Comment } from '../../../common/types'
import Logger from '@ptkdev/logger'

const log = new Logger()

export function validator(fields: string[], params: Object): Boolean {
    // Checagem dos parametros da requisição HTTP
    for (var i = 0; i < fields.length; i++) {
        if (params.hasOwnProperty(fields[i]) === false) return false
    }

    return true
}

export function getNews(request: Request, response: Response): void {
    log.info('GetNews request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()
    let result: News | undefined = db.getNews(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getNewsPage(request: Request, response: Response): void {
    log.info('GetNewsPage request received')

    const valid = validator(['pageId', 'newsPerPage'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let pageId: number = parseInt(request.params.pageId)
    let newsPerPage: number = parseInt(request.params.newsPerPage)

    let db: NewsDB = new NewsDB()
    let result: News[] = db.getNewsPage(pageId, newsPerPage)

    if (result.length == 0) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getAllNews(request: Request, response: Response): void {
    log.info('GetAllNews request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()
    let result: News[] = db.getAllNews()

    if (result.length == 0) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getNewsSize(request: Request, response: Response): void {
    log.info('GetNewsSize request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()
    let result: number = db.getSize()

    let httpResponse: ApiResponse = HTTP_SUCCESS
    httpResponse.result = result

    response.send(httpResponse)

    return
}

export function createNews(request: Request, response: Response): void {
    log.info('CreateNews request received')

    const valid = validator(
        ['id', 'authorId', 'title', 'description', 'date', 'markdownText', 'edited', 'views', 'likes', 'comments', 'tags'],
        request.body
    )

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let createNews: Promise<Boolean> = db.createNews(request.body as News)

    createNews.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function deleteNews(request: Request, response: Response): void {
    log.info('DeleteNews request received')

    const valid = validator(['id'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let deleteNews: Promise<Boolean> = db.deleteNews(request.body.id)

    deleteNews.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function editNews(request: Request, response: Response): void {
    log.info('EditNews request received')

    const valid = validator(
        ['id', 'authorId', 'title', 'description', 'date', 'markdownText', 'edited', 'views', 'likes', 'comments', 'tags'],
        request.body
    )

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let editNews: Promise<Boolean> = db.editNews(request.body.id, request.body as News)

    editNews.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function addView(request: Request, response: Response): void {
    log.info('AddView request received')

    const valid = validator(['newsId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let addView: Promise<Boolean> = db.addView(request.body.newsId)

    addView.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function addLike(request: Request, response: Response): void {
    log.info('AddLike request received')

    const valid = validator(['newsId', 'authorLikeId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let addLike: Promise<Boolean> = db.addLike(request.body.newsId, request.body.authorLikeId)

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
    log.info('Remove Like request received')

    const valid = validator(['newsId', 'authorLikeId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let removeLike: Promise<Boolean> = db.removeLike(request.body.newsId, request.body.authorLikeId)

    removeLike.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function addComment(request: Request, response: Response): void {
    log.info('AddComment request received')

    const validParameter = validator(['newsId'], request.params)
    const validBody = validator(['id', 'authorInfo', 'content', 'likes', 'dislikes'], request.body)

    if (!validParameter || !validBody) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let addComment: Promise<Boolean> = db.addComment(request.params.newsId, request.body as Comment)

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
    log.info('Remove Comment request received')

    const validParameter = validator(['newsId'], request.params)
    const validBody = validator(['id', 'authorInfo', 'content', 'likes', 'dislikes'], request.body)

    if (!validParameter || !validBody) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: NewsDB = new NewsDB()

    let removeComment: Promise<Boolean> = db.removeComment(request.params.newsId, request.body as Comment)

    removeComment.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}
