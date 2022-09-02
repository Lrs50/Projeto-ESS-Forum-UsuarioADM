import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiResponse, Like } from '../../../../common/types'

@Injectable({
    providedIn: 'root',
})
export class LikesService {
    private baseUrl: string = 'http://localhost:3000/like'

    constructor(private httpClient: HttpClient) {}

    get(likeId: Like): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + `/${likeId}`)
    }

    create(newsId: string, likeId: Like): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(this.baseUrl, { newsId, likeId })
    }

    remove(newsId: string, likeId: Like): Observable<ApiResponse> {
        return this.httpClient.delete<ApiResponse>(this.baseUrl, { body: { newsId, likeId } })
    }
}
