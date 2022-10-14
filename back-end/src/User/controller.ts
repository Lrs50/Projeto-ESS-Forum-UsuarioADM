import { Request, Response } from 'express'
import UsersDB from './users'
import { HTTP_SUCCESS, HTTP_BAD_REQUEST, HTTP_NOT_FOUND, HTTP_ERROR, ApiResponse, User, Comment } from '../../../common/types'
import Logger from '@ptkdev/logger'

const log = new Logger()

export function validator(fields: string[], params: Object): Boolean {
    // Checagem dos parametros da requisição HTTP
    for (var i = 0; i < fields.length; i++) {
        if (params.hasOwnProperty(fields[i]) === false) return false
    }

    return true
}

export function getUserCommon(request: Request, response: Response): void {
    log.info('GetUserCommon request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User | undefined = db.getUserCommon(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}
//Metodos Mod Users
export function getMod(request: Request, response: Response): void {
    log.info('GetMod request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User | undefined = db.getUserMod(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}


//METODOS COMMON USERS
export function getAllCommonUser(request: Request, response: Response): void {
    log.info('GetAllCommonUser request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User[] = db.getAllCommonUser()

    if (result.length == 0) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
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
export function deleteCommonUser(request: Request, response: Response): void {
    log.info('Remove common user profile request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let removeComment: Promise<Boolean> = db.deleteCommonUser(request.params.id)

    removeComment.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function getCommonUsersSize(request: Request, response: Response): void {
    log.info('GetCommonUsersSize request received')
    
    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: number = db.getCommonSize()

    let httpResponse: ApiResponse = HTTP_SUCCESS
    httpResponse.result = result

    response.send(httpResponse)

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

export function getUsersSize(request: Request, response: Response): void {
    log.info('GetUsersSize request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: number = db.getSize()

    let httpResponse: ApiResponse = HTTP_SUCCESS
    httpResponse.result = result

    response.send(httpResponse)

    return
}

export function createUser(request: Request, response: Response): void {
    log.info('CreateUser request received')

    const valid = validator(['id', 'name', 'username', 'password', 'aboutme', 'type', 'cover', 'avatar', 'profileComments'], request.body)

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

    const valid = validator(['id', 'name', 'username', 'password', 'aboutme', 'type', 'cover', 'avatar', 'profileComments'], request.body)

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

//MÉTODOS ADMIN USERS

export function getUserAdmin(request: Request, response: Response): void {
    log.info('GetUserAdmin request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User | undefined = db.getUserAdmin(request.params.id)

    if (result == undefined) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getAllAdminUsers(request: Request, response: Response): void {
    log.info('GetAllAdminUsers request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: User[] = db.getAllAdminUsers()

    if (result.length == 0) {
        response.send(HTTP_NOT_FOUND)
    } else {
        let httpResponse: ApiResponse = HTTP_SUCCESS
        httpResponse.result = result

        response.send(httpResponse)
    }

    return
}

export function getAdminUsersSize(request: Request, response: Response): void {
    log.info('GetAdminUsersSize request received')

    const valid = validator([], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let result: number = db.getAdminSize()

    let httpResponse: ApiResponse = HTTP_SUCCESS
    httpResponse.result = result

    response.send(httpResponse)

    return
}

export function deleteAdminUser(request: Request, response: Response): void {
    log.info('DeleteAdminUser request received')

    const valid = validator(['id'], request.params)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()
    let removeComment: Promise<Boolean> = db.deleteAdminUser(request.params.id)

    removeComment.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}

export function editAdminUser(request: Request, response: Response): void {
    log.info('EditUser request received')

    const valid = validator(['id', 'name', 'username', 'password', 'aboutme', 'type', 'cover', 'avatar', 'profileComments'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()

    let editUser: Promise<Boolean> = db.editAdminUser(request.body as User)

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

export function addComment(request: Request, response: Response): void {
    log.info('AddComment user profile request received')

    const validParameter = validator(['userId'], request.params)
    const validBody = validator(['id', 'authorInfo', 'content', 'likes', 'dislikes'], request.body)

    if (!validParameter || !validBody) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()

    let addComment: Promise<Boolean> = db.addComment(request.params.userId, request.body as Comment)

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
    log.info('Remove Comment user profile request received')

    const valid = validator(['userId', 'commentId'], request.body)

    if (!valid) {
        response.send(HTTP_BAD_REQUEST)

        return
    }

    let db: UsersDB = new UsersDB()

    let removeComment: Promise<Boolean> = db.removeComment(request.body.userId, request.body.commentId)

    removeComment.then((result: Boolean) => {
        if (result) {
            response.send(HTTP_SUCCESS)
        } else {
            response.send(HTTP_ERROR)
        }
    })

    return
}
