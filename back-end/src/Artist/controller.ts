import { Request, Response } from 'express'
import ArtistsDB from './artists'
import { HTTP_SUCCESS, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_ERROR, ApiResponse, Artist } from '../../../common/types'
import Logger from '@ptkdev/logger'

const log = new Logger()

export function validator(fields: string[], params: Object): Boolean {
    // Checagem dos parametros da requisição HTTP
    for (var i = 0; i < fields.length; i++) {
        if (params.hasOwnProperty(fields[i]) === false) return false
    }

    return true
}

export function getArtist(request: Request, response: Response): void {
    log.info('GetArtist request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: ArtistsDB = new ArtistsDB()
    let result: Artist | undefined = db.getArtist(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getAllArtists(request: Request, response: Response): void {
    log.info('GetAllArtist request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: ArtistsDB = new ArtistsDB()
    let result: Artist[] = db.getAllArtists()

    if (result.length == 0) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getArtistsSize(request: Request, response: Response): void {
    log.info('GetArtistsSize request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: ArtistsDB = new ArtistsDB()
    let result: number = db.getSize()

    let httpResponse: ApiResponse = HTTP_SUCCESS
    httpResponse.result = result

    response.send(httpResponse)

    return
}

export function createArtist(request: Request, response: Response): void {
    log.info('CreateArtist request received')

    const valid = validator(['id', 'name', 'mentions', 'description', 'cover'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: ArtistsDB = new ArtistsDB()

    let createArtist: Promise<Boolean> = db.createArtist(request.body as Artist)

    createArtist.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function editArtist(request: Request, response: Response): void {
    log.info('EditArtist request received')

    const valid = validator(['id', 'name', 'mentions', 'description', 'cover'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: ArtistsDB = new ArtistsDB()

    let editArtist: Promise<Boolean> = db.editArtist(request.body as Artist)

    editArtist.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}
