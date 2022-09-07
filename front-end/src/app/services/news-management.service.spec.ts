import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NewsManagementService } from './news-management.service'
import { HttpClient } from '@angular/common/http'
import { ApiResponse, createHTTPSuccessWithResult, emptyNews, HTTP_SUCCESS } from '../../../../common/types'
import { observable, Observable, Subscriber } from 'rxjs'

fdescribe('NewsManagementService', () => {
    let service: NewsManagementService
    let http: HttpClient
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        })
        service = TestBed.inject(NewsManagementService)
        http = TestBed.inject(HttpClient)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('Get method should be called with a valid endpoint', () => {
        let spy = spyOn(http, 'get')

        service.get('123')

        expect(spy).toHaveBeenCalledOnceWith('http://localhost:3000/news/123')
    })

    it('Service should be able to get a news', () => {
        let temp = new Observable<ApiResponse>((subscriber: Subscriber<ApiResponse>) => {
            subscriber.next(createHTTPSuccessWithResult(emptyNews('', '')))
            subscriber.complete()
        })

        let spy = spyOn(http, 'get').and.returnValue(temp)

        let response: Observable<ApiResponse> = service.get('123')

        response.subscribe((res: ApiResponse) => {
            expect(spy).toHaveBeenCalledOnceWith('http://localhost:3000/news/123')
            expect(res.result).not.toBe(undefined)
        })
    })

    it('Service should be able to create a news', () => {
        let temp = new Observable<ApiResponse>((subscriber: Subscriber<ApiResponse>) => {
            subscriber.next(HTTP_SUCCESS)
            subscriber.complete()
        })

        let spy = spyOn(http, 'post').and.returnValue(temp)

        let response: Observable<ApiResponse> = service.create(emptyNews('', ''))

        response.subscribe((res: ApiResponse) => {
            expect(spy).toHaveBeenCalledOnceWith('http://localhost:3000/news', emptyNews('', ''))
            expect(res.status).toBe(200)
        })
    })

    it('Service should be able to edit a news', () => {
        let temp = new Observable<ApiResponse>((subscriber: Subscriber<ApiResponse>) => {
            subscriber.next(HTTP_SUCCESS)
            subscriber.complete()
        })

        let spy = spyOn(http, 'put').and.returnValue(temp)

        let response: Observable<ApiResponse> = service.edit(emptyNews('', ''))

        response.subscribe((res: ApiResponse) => {
            expect(spy).toHaveBeenCalledOnceWith('http://localhost:3000/news', emptyNews('', ''))
            expect(res.status).toBe(200)
        })
    })

    it('Service should be able to delete a news', () => {
        let temp = new Observable<ApiResponse>((subscriber: Subscriber<ApiResponse>) => {
            subscriber.next(HTTP_SUCCESS)
            subscriber.complete()
        })

        let spy = spyOn(http, 'delete').and.returnValue(temp)

        let response: Observable<ApiResponse> = service.delete('')

        response.subscribe((res: ApiResponse) => {
            expect(spy).toHaveBeenCalledOnceWith('http://localhost:3000/news', { body: { id: '' } })
            expect(res.status).toBe(200)
        })
    })
})
