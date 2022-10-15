import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { ApiResponse, News, User, emptyUser, emptyArtist, Artist, ArtistTypes } from '../../../../../common/types'
import { imageFallBack } from 'src/util'
import { UsersService } from 'src/app/services/users.service'
import { ArtistService } from 'src/app/services/artist.service'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {

  imgFall: string = imageFallBack

  statusInputTitle: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined
  statusInputContent: NzStatus = ''
  statusInputDescription: 'secondary' | 'warning' | 'danger' | 'success' | undefined = undefined

  artist: Artist = emptyArtist('')

  avaliableTypes: string[] = [...ArtistTypes]

  constructor(
      private artistManagementService: ArtistService,
      private route: ActivatedRoute,
      private message: NzMessageService,
      private userService: UsersService,
      private router: Router,
      private artistService: ArtistService
  ) {
    const id: string | null = this.route.snapshot.paramMap.get('id')

    if (id != null) {
      this.artistManagementService.get(id).subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.artist = res.result as Artist
          } else {
              this.router.navigateByUrl('/notfound')
          }
      })
    }
  }

  ngOnInit(): void {}

  validateEditInfo(): boolean {
    var result: boolean = true

    this.statusInputTitle = undefined
    this.statusInputDescription = undefined
    this.statusInputContent = ''

    if (this.artist.name == '') {
        this.statusInputTitle = 'danger'
        result = false
    }

    if (this.artist.type == "") {
        this.statusInputDescription = 'danger'
        result = false
    }
    
    if (this.artist.description == '') {
        this.statusInputDescription = 'danger'
        result = false
    }

    return result
  }

  onSaveArtist(): void {
      if (this.validateEditInfo() == false) {
          this.message.create('error', `Please make sure that the Name and the Description are not empty!`)
          return
      }

      this.artistManagementService.edit(this.artist).subscribe(async (res: ApiResponse) => {
          if (res.status == 200) {
              this.message.create('success', `Saved!`)
              this.router.navigateByUrl('/home/management/artist')
          } else {
              this.message.create('error', `Failed to save the Artist!`)
              this.router.navigateByUrl('/error')
          }
      })
  }

}
