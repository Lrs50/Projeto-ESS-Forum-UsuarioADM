import { Component, OnInit } from '@angular/core';
import { ApiResponse, Artist,User, News } from '../../../../../common/types'
import { NzMessageService } from 'ng-zorro-antd/message'
import { imageFallBack } from 'src/util'
import { Store } from '@ngrx/store'
import { AppState, addToUserCount } from 'src/app/app.store'
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {

  imageFall: string = imageFallBack
  adminList: User[] = []

  tableLoading: boolean = false

  pageSizeOptions: number[] = [5, 10, 20, 30, 40]
  pageSize: number = 5
  pageIndex: number = 1
  totalAdmin: number = 1

  filterText: string = ''

  debounceTimer: any

  constructor(
      private message: NzMessageService,
      private store: Store<{ app: AppState }>,
      private router: Router,
      private userService: UsersService
  ) {
      this.getAdminPage()
  }

  ngOnInit(): void {}

  getUsersAdminSize() {
      this.userService.getUsersAdminSize().subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.totalAdmin = res.result as number
          } else {
              this.totalAdmin = 1
          }
      })
  }

  updatePageIndex(event: number) {
      this.pageIndex = event

      this.getAdminPage()
  }

  debouncedHTTPRequest() {
      clearTimeout(this.debounceTimer)

      this.debounceTimer = setTimeout(() => {
          this.getAdminPage()
      }, 1000)
  }

  updatePageSize(event: number) {
      this.pageSize = event

      this.getAdminPage()
  }

  getAdminPage() {
      this.tableLoading = true

      this.getUsersAdminSize()

      this.userService.getAdminPage(this.pageIndex, this.pageSize, this.filterText).subscribe((res: ApiResponse) => {
          if (res.status == 200) {
              this.adminList = res.result as User[]
          } else {
              this.router.navigateByUrl('/error')
          }

          this.tableLoading = false
      })
  }

  findIndexFromAdminList(id: string): number {
      let i: number = 0

      for (; i < this.adminList.length; i++) {
          if (this.adminList[i].id == id) {
              return i
          }
      }

      return i
  }

  onDeleteUserAdmin(id: string): void {
      let find: number = this.findIndexFromAdminList(id)

      this.userService.delete(id).subscribe(async (res: ApiResponse) => {
          if (res.status == 200) {
              this.getAdminPage()
              this.store.dispatch(addToUserCount({ payload: -1 }))

              this.message.create('success', `Admin deleted successfully!`)
          } else {
              this.message.create('error', `Failed to delete the Admin!`)
          }
      })
  }

}
