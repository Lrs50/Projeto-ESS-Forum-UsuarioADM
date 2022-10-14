import { Component, OnInit } from '@angular/core';
import { ApiResponse, Artist } from '../../../../../common/types'
import { imageFallBack } from 'src/util'
import { Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  imageFall: string = imageFallBack
  artistList: Artist[] = []

  tableLoading: boolean = false

  pageSizeOptions: number[] = [5, 10, 20, 30, 40]
  pageSize: number = 10
  pageIndex: number = 1
  totalArtist: number = 1

  filterText: string = ''

  mentionedArtistsNamesInNews: string[][] = []

  debounceTimer: any

  constructor(
      private router: Router,
      private artistService: ArtistService
  ) {
      this.getArtistPage()
  }

  ngOnInit(): void {}

  getArtistSize() {
      this.artistService.getArtistsSize().subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.totalArtist = res.result as number
          } else {
              this.totalArtist = 1
          }
      })
  }

  updatePageIndex(event: number) {
      this.pageIndex = event

      this.getArtistPage()
  }

  debouncedHTTPRequest() {
      clearTimeout(this.debounceTimer)

      this.debounceTimer = setTimeout(() => {
          this.getArtistPage()
      }, 1000)
  }

  updatePageSize(event: number) {
      this.pageSize = event

      this.getArtistPage()
  }

  getArtistPage() {
      this.tableLoading = true

      this.getArtistSize()

      this.artistService.getPage(this.pageIndex, this.pageSize, this.filterText).subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.artistList = res.result as Artist[]
          } else {
              this.router.navigateByUrl('/error')
          }

          this.tableLoading = false
      })
  }
  
}
