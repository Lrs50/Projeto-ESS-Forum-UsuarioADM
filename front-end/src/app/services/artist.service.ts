import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiResponse, Artist } from '../../../../common/types'

@Injectable({
    providedIn: 'root',
})
export class ArtistService {
    private baseUrl: string = 'http://localhost:3000/artist'

    constructor(private httpClient: HttpClient) {}

    create(user: Artist): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(this.baseUrl, user)
    }

    edit(user: Artist): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(this.baseUrl, user)
    }

    get(id: string): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + `/${id}`)
    }

    getAll(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + 'all')
    }

    getPage(pageId: number, ArtistPerPage: number, filterTerm: string): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + `page/${pageId}/${ArtistPerPage}/${filterTerm}`)
    }

    getArtistsSize(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(this.baseUrl + 'size')
    }

    delete(id: string): Observable<ApiResponse>{
        return this.httpClient.delete<ApiResponse>(this.baseUrl + `/${id}`)
    }

    addMention(id: string, mentions: number): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(this.baseUrl + 'add/mention', { id, mentions })
    }
}
