import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'
import { UsersService } from 'src/app/services/users.service'
import { imageFallBack } from 'src/util'
import { ApiResponse, emptyUser, User } from '../../../../../common/types'

@Component({
    selector: 'app-user-profile-edit',
    templateUrl: './user-profile-edit.component.html',
    styleUrls: ['./user-profile-edit.component.css'],
})
export class UserProfileEditComponent implements OnInit {
    imgFall: string = imageFallBack

    editingUser: User = emptyUser('')

    showModalEditAvatar: boolean = false

    constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router, private message: NzMessageService) {
        const userId: string | null = this.route.snapshot.paramMap.get('id')

        if (userId != null) {
            this.userService.get(userId).subscribe((res: ApiResponse) => {
                if (res.status == 200) {
                    this.editingUser = res.result as User
                } else {
                    this.router.navigateByUrl('/notfound')
                }
            })
        } else {
            this.router.navigateByUrl('/notfound')
        }
    }

    ngOnInit(): void {}

    toggleModalEditAvatar() {
        this.showModalEditAvatar = !this.showModalEditAvatar
    }

    onSaveUser() {
        this.userService.edit(this.editingUser).subscribe((res: ApiResponse) => {
            if (res.status == 200) {
                this.message.create('success', `Saved successfully!`)
            } else {
                this.router.navigateByUrl('/error')
            }
        })
    }
}
