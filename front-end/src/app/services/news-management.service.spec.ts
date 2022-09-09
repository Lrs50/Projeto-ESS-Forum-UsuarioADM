import { TestBed } from '@angular/core/testing'
import { NewsManagementService } from './news-management.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ApiResponse, emptyNews } from '../../../../common/types'
import { firstValueFrom } from 'rxjs'

jasmine.getEnv().configure({ random: false })

fdescribe('NewsManagementService', () => {
    let service: NewsManagementService
    let http: HttpClient

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        })
        service = TestBed.inject(NewsManagementService)
        http = TestBed.inject(HttpClient)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('Service should be able to CREATE a news', async () => {
        let spy = spyOn(http, 'post').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.create(emptyNews('123', '123')))

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/news', emptyNews('123', '123'))
        expect(response.status).toBe(200)
    })

    it('Service should be able to GET a news', async () => {
        let spy = spyOn(http, 'get').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.get('123'))

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/news/123')
        expect(response.status).toBe(200)
        expect(response.result).not.toBeUndefined()
    })

    it('Service should be able to GETALL news', async () => {
        let spy = spyOn(http, 'get').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.getAll())

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/newsall')
        expect(response.status).toBe(200)
        expect(response.result).not.toBeUndefined()
    })

    it('Service should be able to GETSIZE of news', async () => {
        let spy = spyOn(http, 'get').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.getNewsSize())

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/newssize')
        expect(response.status).toBe(200)
        expect(response.result).not.toBeUndefined()
    })

    it('Service should be able to GETPAGE of news', async () => {
        let spy = spyOn(http, 'get').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.getPage(1, 5))

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/newspage/1/5')
        expect(response.status).toBe(200)
        expect(response.result).not.toBeUndefined()
    })

    it('Service should be able to EDIT a news', async () => {
        let spy = spyOn(http, 'put').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.edit(emptyNews('123', '123')))

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/news', emptyNews('123', '123'))
        expect(response.status).toBe(200)
    })

    it('Service should be able to DELETE a news', async () => {
        let spy = spyOn(http, 'delete').and.callThrough()

        let response: ApiResponse = await firstValueFrom(service.delete('123'))

        expect(spy).toHaveBeenCalledWith('http://localhost:3000/news', { body: { id: '123' } })
        expect(response.status).toBe(200)
    })
})
