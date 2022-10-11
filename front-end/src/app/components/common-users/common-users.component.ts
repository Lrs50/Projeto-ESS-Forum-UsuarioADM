import { Component, OnInit } from '@angular/core'
import { ApiResponse, Artist, News, User } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { UsersService } from 'src/app/services/users.service'
import { imageFallBack } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToNewsCount } from 'src/app/app.store'
import { Router } from '@angular/router'
import { ArtistService } from 'src/app/services/artist.service'

@Component({
  selector: 'app-common-users',
  templateUrl: './common-users.component.html',
  styleUrls: ['./common-users.component.css']
})

export class CommonUsersComponent implements OnInit {

  imageFall: string = imageFallBack
  commonUserList: User[] = []

  tableLoading: boolean = false

  pageSizeOptions: number[] = [10, 20, 30, 40]
  pageSize: number = 10
  pageIndex: number = 1
  totalCommonUser: number = 1

  filterText: string = ''

  mentionedArtistsNamesInNews: string[][] = []

  debounceTimer: any

  constructor(
      private message: NzMessageService,
      private newsManagementService: NewsManagementService,
      private UserService: UsersService,
      private store: Store<{ app: AppState }>,
      private router: Router,
      private artistService: ArtistService
  ) {
      this.getCommonUserPage()
  }

  ngOnInit(): void {}

  getCommonUserSize() {
      this.newsManagementService.getNewsSize().subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.totalCommonUser = res.result as number
          } else {
              this.totalCommonUser = 1
          }
      })
  }

  updatePageIndex(event: number) {
      this.pageIndex = event

      this.getCommonUserPage()
  }

  debouncedHTTPRequest() {
      clearTimeout(this.debounceTimer)

      this.debounceTimer = setTimeout(() => {
          this.getCommonUserPage()
      }, 1000)
  }

  updatePageSize(event: number) {
      this.pageSize = event

      this.getCommonUserPage()
  }
//refactoring
  getCommonUserPage() {
      this.tableLoading = true

      //this.getCommonUserSize()

      this.UserService.getcommonAll().subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.commonUserList = res.result as User[]
              this.commonUserList = this.commonUserList.filter(a => a.username.includes(this.filterText)) 
              //for (let i = 0; i < this.commonUserList.length; i++) {
                //  let tempList: string[] = []
                 // console.log(this.commonUserList[i].name)
                 // for (let j = 0; j < this.commonUserList[i].mention.length; j++) {
                  //    this.artistService.get(this.commonUserList[i].mention[j]).subscribe((res: ApiResponse) => {
                   //       if (res.status == 200) {
                    //          tempList.push((res.result as Artist).name)
                     //     } else {
                      //        this.router.navigateByUrl('/error')
                       //   }
                      //})
                  //}

              //    this.mentionedArtistsNamesInNews.push(tempList)
             // }
          } else {
            this.commonUserList =[]  
            //this.router.navigateByUrl('/error')
          }

          this.tableLoading = false
      })
  }

  findIndexFromFilteredList(id: string): number {
      let i: number = 0

      for (; i < this.commonUserList.length; i++) {
          if (this.commonUserList[i].id == id) {
              return i
          }
      }

      return i
  }

  deleteCommonUser(id: string): void {
      this.commonUserList = this.commonUserList.filter(a => a.id != id)
      this.UserService.removeCommonUser(id).subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.message.create('success', `News deleted successfully!`)
          } else {
              this.message.create('error', `Failed to delete the news!`)
          }
      })
  }
}
