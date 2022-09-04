import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ApiResponse, User } from '../../../../common/types'

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private baseUrl: string = 'http://localhost:3000/user'

    constructor(private httpClient: HttpClient) {}

    create(user: User): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(this.baseUrl, user)
    }

    get(id: string): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + `/${id}`)
    }

    getAll(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + 'all')
    }

    login(username: string, password: string) {
        return this.httpClient.post<ApiResponse>(this.baseUrl + `login`, { username, password })
    }
}
