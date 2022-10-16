import { Component, OnInit } from '@angular/core'
import { ApiResponse, Artist, News, User } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NewsManagementService } from 'src/app/services/news-management.service'
import { UsersService } from 'src/app/services/users.service'
import { imageFallBack } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToUserCount } from 'src/app/app.store'
import { Router } from '@angular/router'


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
  counter: number= 0
  filterText: string = ''

  mentionedArtistsNamesInNews: string[][] = []

  debounceTimer: any

  constructor(
      private message: NzMessageService,
      private newsManagementService: NewsManagementService,
      private UserService: UsersService,
      private router: Router,
      private store: Store<{ app: AppState }>,
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

  createFakeUser(){
    
    var fakeUser: User= {
        id: 'fake-id',
        username: 'fake-username',
        name: 'fake-name',
        aboutme:'fake-aboutme',
        password:'fake-password',
        type:'User',
        cover:'fake-cover',
        avatar:'fake-avatar',
        profileComments:[],
    }
    
    this.UserService.create(fakeUser).subscribe((res: ApiResponse) =>{
        if (res.status == 200) {
            this.getCommonUserPage()
            this.store.dispatch(addToUserCount({ payload: +1 }))
        }else {
            //this.commonUserList =[]  
            this.router.navigateByUrl('/error')
          }
    })
    

  }
  createFakeUserGenericaly(){
    
    var fakeUser: User= {
        id: 'fake-id' + this.counter,
        username: 'fake-username' + this.counter,
        name: 'fake-name' + this.counter,
        aboutme:'fake-aboutme',
        password:'fake-password',
        type:'User',
        cover:'fake-cover',
        avatar:'fake-avatar',
        profileComments:[],
    }
    this.counter +=1
    
    this.UserService.create(fakeUser).subscribe((res: ApiResponse) =>{
        if (res.status == 200) {
            this.store.dispatch(addToUserCount({ payload: +1 }))
            this.getCommonUserPage()
        }else {
            //this.commonUserList =[]  
            this.router.navigateByUrl('/error')
          }
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
            this.store.dispatch(addToUserCount({ payload: -1 }))
            this.message.create('success', `Common user deleted successfully!`)
          } else {
            this.message.create('error', `Failed to delete the Common user!`)
          }
      })
  }
}
