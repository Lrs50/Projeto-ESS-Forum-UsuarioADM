import express, { Application, Request, Response } from 'express'
import * as NewsController from './News/controller' // Controller responsável pelas requisições http
import * as UsersController from './User/controller'
import * as ArtistsController from './Artist/controller'
import { HTTP_SUCCESS } from '../../common/types'
import cors from 'cors'
import AppConfig from './app.config.json'

import Logger from '@ptkdev/logger'

const log = new Logger()

const app: Application = express()
const port = AppConfig.PORT

app.use(cors({ origin: AppConfig.EXPRESS_ORIGIN_ALLOW }))
app.use(express.json())

// As rotas são cadastradas aqui, "/" significa localhost:3000, usar o POSTMAN para fazer as requisições e testar.
// Estudar sobre REST API
// Pra rodar o back-end basta entrar na pasta e rodar npm start

app.get('/', (request: Request, response: Response) => {
    response.send(HTTP_SUCCESS)
})

app.get('/news/:id', NewsController.getNews)
app.get('/newspage/:pageId/:newsPerPage/:order/:filterTerm?', NewsController.getNewsPage)
app.get('/newsall', NewsController.getAllNews)
app.get('/newssize', NewsController.getNewsSize)
app.post('/news', NewsController.createNews)
app.delete('/news', NewsController.deleteNews)
app.put('/news', NewsController.editNews)
app.post('/newsadd/view', NewsController.addView)
app.post('/newsadd/like', NewsController.addLike)
app.delete('/newsremove/like', NewsController.removeLike)
app.post('/newsadd/comment/:newsId', NewsController.addComment)
app.delete('/newsremove/comment', NewsController.removeComment)
app.post('/news/commentsadd/like', NewsController.addLikeInComment)
app.delete('/news/commentsremove/like', NewsController.removeLikeInComment)
app.post('/news/commentsadd/dislike', NewsController.addDislikeInComment)
app.delete('/news/commentsremove/dislike', NewsController.removeDislikeInComment)
app.put('/newsupdate/lastactivity', NewsController.updateLastActivity)

app.get('/user/:id', UsersController.getUser)
app.get('/userall', UsersController.getAllUsers)
app.get('/usersize', UsersController.getUsersSize)
app.post('/user', UsersController.createUser)
app.put('/user', UsersController.editUser)
app.post('/userlogin', UsersController.loginUser)
app.post('/useradd/comment/:userId', UsersController.addComment)
app.delete('/userremove/comment', UsersController.removeComment)
app.get('/userpage/:pageId/:usersPerPage/:filterTerm?', UsersController.getUsersPage)

app.get('/artist/:id', ArtistsController.getArtist)
app.get('/artistall', ArtistsController.getAllArtists)
app.get('/artistpage/:pageId/:artistPerPage/:filterTerm?', ArtistsController.getArtistPage)
app.get('/artistsize', ArtistsController.getArtistsSize)
app.post('/artist', ArtistsController.createArtist)
app.put('/artist', ArtistsController.editArtist)

app.put('/artistadd/mention', ArtistsController.addMention)

app.delete('/artist/:id', ArtistsController.deleteArtist)

app.get('/commonUser/:id', UsersController.getUserCommon)
app.get('/commonAll', UsersController.getAllCommonUser)
app.delete('/commonUser/:id', UsersController.deleteCommonUser)
app.get('/adminUser/:id', UsersController.getUserAdmin)
app.get('/adminAll', UsersController.getAllAdminUsers)
app.put('/adminUser', UsersController.editAdminUser)
app.delete('/adminUser/:id', UsersController.deleteAdminUser)
app.get('/adminSize',UsersController.getAdminUsersSize)
app.get('/adminpage/:pageId/:adminPerPage/:filterTerm?', UsersController.getAdminPage)
app.delete('/user/:id', UsersController.deleteUser)

app.get('/getMod/:id',UsersController.getMod)

app.listen(port, () => {
    log.info('Backend listening on port 3000')
})
