import express, { Application, Request, Response } from 'express'
import * as NewsController from './News/controller' // Controller responsável pelas requisições http
import * as UsersController from './User/controller'
import { HTTP_SUCCESS } from '../../common/types'
import cors from 'cors'

import Logger from '@ptkdev/logger'

const log = new Logger()

const app: Application = express()
const port = 3000

app.use(cors({ origin: 'http://localhost:4200' }))
app.use(express.json())

// As rotas são cadastradas aqui, "/" significa localhost:3000, usar o POSTMAN para fazer as requisições e testar.
// Estudar sobre REST API
// Pra rodar o back-end basta entrar na pasta e rodar npm start

app.get('/', (request: Request, response: Response) => {
    response.send(HTTP_SUCCESS)
})

app.get('/news/:id', NewsController.getNews)
app.get('/newspage/:pageId/:newsPerPage', NewsController.getNewsPage)
app.get('/newsall', NewsController.getAllNews)
app.get('/newssize', NewsController.getNewsSize)
app.post('/news', NewsController.createNews)
app.delete('/news', NewsController.deleteNews)
app.put('/news', NewsController.editNews)
app.post('/newsadd/like', NewsController.addLike)
app.post('/newsadd/view', NewsController.addView)
app.post('/newsadd/comment/:newsId', NewsController.addComment)
app.post('/newsremove/like', NewsController.removeLike)

app.get('/user/:id', UsersController.getUser)
app.get('/userall', UsersController.getAllUsers)
app.post('/user', UsersController.createUser)
app.post('/userlogin', UsersController.loginUser)

app.listen(port, () => {
    log.info('Backend listening on port 3000')
})
