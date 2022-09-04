import { Request, Response } from 'express'
import UsersDB from './users'
import { HTTP_SUCCESS, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_ERROR, ApiResponse, User } from '../../../common/types'
import Logger from '@ptkdev/logger'

const log = new Logger()

export function validator(fields: string[], params: Object): Boolean {
    // Checagem dos parametros da requisição HTTP
    for (var i = 0; i < fields.length; i++) {
        if (params.hasOwnProperty(fields[i]) === false) return false
    }

    return true
}

export function getUser(request: Request, response: Response): void {
    log.info('GetUser request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User | undefined = db.getUser(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getAllUsers(request: Request, response: Response): void {
    log.info('GetAllUser request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User[] = db.getAllUsers()

    if (result.length == 0) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function createUser(request: Request, response: Response): void {
    log.info('CreateUser request received')

    const valid = validator(['id', 'name', 'username', 'password', 'aboutme', 'type', 'cover', 'avatar'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()

    let createUser: Promise<Boolean> = db.createUser(request.body as User)

    createUser.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function editUser(request: Request, response: Response): void {
    log.info('EditUser request received')

    const valid = validator(['id', 'name', 'username', 'password', 'aboutme', 'type', 'cover', 'avatar'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()

    let editUser: Promise<Boolean> = db.editUser(request.body as User)

    editUser.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function loginUser(request: Request, response: Response): void {
    log.info('LoginUser request received')

    const valid = validator(['username', 'password'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()

    let result: User | undefined = db.login(request.body.username as string, request.body.password as string)

    if (result != undefined) {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    } else {
        response.send(HTTP_NOT_FOUND)
    }

    return
}
