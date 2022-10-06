import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'
import { ApiResponse, Artist, emptyArtist } from '../../../../../common/types'

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
})
export class ArtistPageComponent implements OnInit {
    loading: boolean = false

    artist: Artist = emptyArtist('')

    constructor(private route: ActivatedRoute, private artistService: ArtistService, private router: Router) {
        const userId: string | null = this.route.snapshot.paramMap.get('id')

        if (userId != null) {
            this.loading = true
            this.artistService.get(userId).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.artist = res.result as Artist
                } else {
                    this.router.navigateByUrl('/notfound')
                }

                this.loading = false
            })
        } else {
            this.router.navigateByUrl('/notfound')
        }
    }

    ngOnInit(): void {}
}
