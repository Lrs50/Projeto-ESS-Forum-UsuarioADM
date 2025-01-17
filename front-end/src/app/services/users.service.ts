import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ApiResponse, User, Comment } from '../../../../common/types'

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private baseUrl: string = 'http://localhost:3000/user'

    constructor(private httpClient: HttpClient) {}

    create(user: User): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(this.baseUrl, user)
    }

    edit(user: User): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(this.baseUrl, user)
    }

    get(id: string): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + `/${id}`)
    }

    getAll(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + 'all')
    }

    //services common user
    getcommonAll(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>('http://localhost:3000/commonAll')
    }
    removeCommonUser(userId: string): Observable<ApiResponse>{
        return this.httpClient.delete<ApiResponse>(`http://localhost:3000/commonUser/${userId}`)
    }

    getUsersSize(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + 'size')
    }

    //services admin user
    removeAdminUser(userId: string): Observable<ApiResponse>{
        return this.httpClient.delete<ApiResponse>(`http://localhost:3000/adminUser/${userId}`)
    }

    getUsersAdminSize(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(`http://localhost:3000/${'adminSize'}`)
    }

    login(username: string, password: string) {
        return this.httpClient.post<ApiResponse>(this.baseUrl + `login`, { username, password })
    }

    addComment(userId: string, comment: Comment): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(this.baseUrl + `add/comment/${userId}`, comment)
    }

    removeComment(userId: string, commentId: string): Observable<ApiResponse> {
        return this.httpClient.delete<ApiResponse>(this.baseUrl + `remove/comment`, { body: { userId, commentId } })
    }

    delete(id: string): Observable<ApiResponse>{
        return this.httpClient.delete<ApiResponse>(this.baseUrl + `/${id}`)
    }

    getAdminPage(pageId: number, AdminPerPage: number, filterTerm: string): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(`http://localhost:3000/adminpage/${pageId}/${AdminPerPage}/${filterTerm}`)
    }

    getPage(pageId: number, newsPerPage: number, filterTerm: string): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + `page/${pageId}/${newsPerPage}/${filterTerm}`)
    }
}
