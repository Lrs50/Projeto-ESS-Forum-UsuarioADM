import { Component, Input, OnInit } from '@angular/core'
import { imageFallBack } from 'src/util'
import { Tag } from '../../../../../common/types'

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
    @Input() tags: Tag[] = []

    imageFall: string = imageFallBack

    constructor() {}

    ngOnInit(): void {}
}
