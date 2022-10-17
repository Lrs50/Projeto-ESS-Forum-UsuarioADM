import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewsCreateComponent } from './news-create.component'
import { HttpClientModule } from '@angular/common/http'
import { AppState } from 'src/app/app.store'
import { emptyNews, emptyUser } from '../../../../../common/types'
import { provideMockStore } from '@ngrx/store/testing'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { MarkdownModule } from 'ngx-markdown'
import { NzCommentModule } from 'ng-zorro-antd/comment'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzResultModule } from 'ng-zorro-antd/result'
import { NzAlertModule } from 'ng-zorro-antd/alert'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { firstValueFrom } from 'rxjs'
import { By } from '@angular/platform-browser'
import {
    UserOutline,
    LogoutOutline,
    LoginOutline,
    LockOutline,
    FileTextOutline,
    CheckOutline,
    PlusSquareOutline,
    DeleteOutline,
    EyeOutline,
    LikeOutline,
    CommentOutline,
    DislikeOutline,
    LinkOutline,
    LikeTwoTone,
    DislikeTwoTone,
    SmileOutline,
    TrophyOutline,
    AimOutline,
    EyeTwoTone,
    FieldTimeOutline,
    ToolOutline,
} from '@ant-design/icons-angular/icons'
import { IconDefinition } from '@ant-design/icons-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'

const icons: IconDefinition[] = [
    UserOutline,
    LogoutOutline,
    LoginOutline,
    SmileOutline,
    TrophyOutline,
    LockOutline,
    FileTextOutline,
    CheckOutline,
    PlusSquareOutline,
    DeleteOutline,
    EyeOutline,
    LikeOutline,
    LikeTwoTone,
    EyeTwoTone,
    CommentOutline,
    DislikeOutline,
    DislikeTwoTone,
    LinkOutline,
    AimOutline,
    FieldTimeOutline,
    ToolOutline,
]

jasmine.getEnv().configure({ random: false })

fdescribe('NewsCreateComponent', () => {
    let component: NewsCreateComponent
    let fixture: ComponentFixture<NewsCreateComponent>

    let initialState: AppState = {
        logged: false,
        user: emptyUser('fake-id'),
        newsCount: 0,
        usersCount: 0,
        artistsCount: 0,
        currentURL: '/home',
        previousURL: '/home',
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewsCreateComponent],
            imports: [
                BrowserAnimationsModule,
                NzMessageModule,
                HttpClientModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                NzButtonModule,
                NzAvatarModule,
                NzSpaceModule,
                NzCardModule,
                NzInputModule,
                NzGridModule,
                NzDividerModule,
                NzTableModule,
                NzPopconfirmModule,
                NzTypographyModule,
                NzToolTipModule,
                NzSelectModule,
                NzMessageModule,
                NzTabsModule,
                NzPaginationModule,
                NzModalModule,
                NzImageModule,
                NzTagModule,
                NzDrawerModule,
                MarkdownModule.forRoot(),
                NzIconModule.forRoot(icons),
                NzCommentModule,
                NzEmptyModule,
                NzSpinModule,
                NzBadgeModule,
                NzPopoverModule,
                NzResultModule,
                NzAlertModule,
                NzRadioModule,
                NzCardModule,
                NzSpaceModule,
                NzTableModule,
                NzEmptyModule,
                NzTagModule,
                NzBadgeModule,
                NzButtonModule,
                NzPopconfirmModule,
                NzInputModule,
            ],
            providers: [provideMockStore({ initialState })],
        }).compileComponents()

        fixture = TestBed.createComponent(NewsCreateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should be able to create a news', async () => {})
})
