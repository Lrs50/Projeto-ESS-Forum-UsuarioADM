import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'
import { imageFallBack } from 'src/util'
import { ApiResponse, Artist } from '../../../../../common/types'
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'

@Component({
    selector: 'app-news-shower',
    templateUrl: './news-shower.component.html',
    styleUrls: ['./news-shower.component.css'],
})
export class NewsShowerComponent implements OnInit {
    @Input() id: string = ''
    @Input() title: string = ''
    @Input() content: string = ''
    @Input() description: string = ''

    @Input() subtitle: string = ''
    @Input() comments: number = 0
    @Input() likes: number = 0
    @Input() views: number = 0
    @Input() cover: string = ''
    @Input() tags: string[] = []
    @Input() mention: string[] = []
    @Input() lastActivity: number = 0

    imageFall: string = imageFallBack

    artistsMentioned: string[] = []

    timeAgo: any

    constructor(private artistService: ArtistService, private router: Router) {
        TimeAgo.addDefaultLocale(en)
        this.timeAgo = new TimeAgo('en-US')
    }

    ngOnInit(): void {
        for (let i = 0; i < this.mention.length; i++) {
            this.artistService.get(this.mention[i]).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    let temp: Artist = res.result as Artist

                    this.artistsMentioned.push(temp.name.toUpperCase())
                } else {
                    this.router.navigateByUrl('/error')
                }
            })
        }
    }
}
