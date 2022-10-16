import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { nanoid } from 'nanoid'
import { NzStatus } from 'ng-zorro-antd/core/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { AppState } from 'src/app/app.store'
import { UsersService } from 'src/app/services/users.service'
import { ApiResponse, Artist, emptyAdm, User, defaultTags } from '../../../../../common/types'
import { imageFallBack } from 'src/util'
import { first, firstValueFrom, map, Observable, Subscription, take } from 'rxjs'
import { addToUserCount } from '../../app.store'
import { ArtistService } from 'src/app/services/artist.service'

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  imgFall: string = imageFallBack

  statusInputUsername: NzStatus = ''
  statusInputName: NzStatus = ''
  statusInputPassword:  NzStatus = ''

  adm: User = emptyAdm('')
  name: string = ''
  username: string = ''
  password: string = ''


  constructor(
      private admService: UsersService,
      private message: NzMessageService,
      private router: Router,
      private store: Store<{ app: AppState }>,
      private artistService: ArtistService
  ) {
  }

  ngOnInit(): void {}

  validateEditInfo(): boolean {
      var result: boolean = true

      this.statusInputUsername = ''
      this.statusInputName =  ''
      this.statusInputPassword = ''

      if (this.username == '') {
          this.statusInputUsername = 'error'
          result = false
      }
      if (this.name == '') {
        this.statusInputName = 'error'
        result = false
      }
      if (this.password == '') {
        this.statusInputPassword = 'error'
        result = false
      }

      return result
  }

  async onCreateAdm(): Promise<void> {
      var result: boolean = this.validateEditInfo()

      if (result == false) {
          this.message.create('error', `Please make sure that Username, Name and Password are not empty!`)
          return
      }

      let temp: User = {
          ...this.adm,
          id: nanoid(),
          name: this.name,
          username: this.username,
          password: this.password

      }

      this.admService.create(temp).subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.message.create('success', `New Admin User was created successfully!`)
              this.store.dispatch(addToUserCount({ payload: 1 }))
              this.router.navigateByUrl('/home/management/admin')
          } else {
              this.message.create('error', `Failed to create the Admin User!`)
              this.router.navigateByUrl('/error')
          }
      })
  }

}
