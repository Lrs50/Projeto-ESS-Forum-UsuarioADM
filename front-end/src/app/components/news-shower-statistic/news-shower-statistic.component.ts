import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-news-shower-statistic',
    templateUrl: './news-shower-statistic.component.html',
    styleUrls: ['./news-shower-statistic.component.css'],
})
export class NewsShowerStatisticComponent implements OnInit {
    constructor() {}

    @Input() subtitle: string = ''
    @Input() value: number = 0

    ngOnInit(): void {}
}
