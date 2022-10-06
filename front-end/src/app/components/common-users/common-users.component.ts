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
  newsList: User[] = []

  tableLoading: boolean = false

  pageSizeOptions: number[] = [10, 20, 30, 40]
  pageSize: number = 10
  pageIndex: number = 1
  totalNews: number = 1

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
      this.getNewsPage()
  }

  ngOnInit(): void {}

  getNewsSize() {
      this.newsManagementService.getNewsSize().subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.totalNews = res.result as number
          } else {
              this.totalNews = 1
          }
      })
  }

  updatePageIndex(event: number) {
      this.pageIndex = event

      this.getNewsPage()
  }

  debouncedHTTPRequest() {
      clearTimeout(this.debounceTimer)

      this.debounceTimer = setTimeout(() => {
          this.getNewsPage()
      }, 1000)
  }

  updatePageSize(event: number) {
      this.pageSize = event

      this.getNewsPage()
  }
//refactoring
  getNewsPage() {
      this.tableLoading = true

      //this.getNewsSize()

      this.UserService.getcommonAll().subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.newsList = res.result as User[]
              this.newsList = this.newsList.filter(a => a.username.includes(this.filterText)) 
              //for (let i = 0; i < this.newsList.length; i++) {
                //  let tempList: string[] = []
                 // console.log(this.newsList[i].name)
                 // for (let j = 0; j < this.newsList[i].mention.length; j++) {
                  //    this.artistService.get(this.newsList[i].mention[j]).subscribe((res: ApiResponse) => {
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
            this.newsList =[]  
            //this.router.navigateByUrl('/error')
          }

          this.tableLoading = false
      })
  }

  findIndexFromFilteredList(id: string): number {
      let i: number = 0

      for (; i < this.newsList.length; i++) {
          if (this.newsList[i].id == id) {
              return i
          }
      }

      return i
  }

  deleteCommonUser(id: string): void {
      this.newsList = this.newsList.filter(a => a.id != id)
      this.UserService.removeCommonUser(id).subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.message.create('success', `News deleted successfully!`)
          } else {
              this.message.create('error', `Failed to delete the news!`)
          }
      })
  }
}
