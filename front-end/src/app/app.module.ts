import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { IconDefinition } from '@ant-design/icons-angular'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzStatisticModule } from 'ng-zorro-antd/statistic'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzListModule } from 'ng-zorro-antd/list'
import { MarkdownModule } from 'ngx-markdown'
import { NzCommentModule } from 'ng-zorro-antd/comment'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzResultModule } from 'ng-zorro-antd/result'
import {
    UserOutline,
    LogoutOutline,
    LoginOutline,
    TeamOutline,
    HomeOutline,
    ThunderboltOutline,
    LockOutline,
    DownOutline,
    FileTextOutline,
    SettingOutline,
    CheckOutline,
    PlusSquareOutline,
    DeleteOutline,
    EyeOutline,
    LikeOutline,
    CommentOutline,
    DislikeOutline,
    LinkOutline,
    LikeTwoTone,
    FileTextFill,
    ThunderboltFill,
    SettingFill,
    FireFill,
    HourglassFill,
    SmileFill,
    TrophyFill,
    DislikeTwoTone,
    ProfileOutline,
} from '@ant-design/icons-angular/icons'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { NewsManagementComponent } from './components/news-management/news-management.component'
import { appReducer } from './app.store'
import { NewsComponent } from './components/news/news.component'
import { NewsShowerComponent } from './components/news-shower/news-shower.component'
import { NewsShowerStatisticComponent } from './components/news-shower-statistic/news-shower-statistic.component'
import { NewsPageComponent } from './components/news-page/news-page.component'
import { NewsEditComponent } from './components/news-edit/news-edit.component'
import { NewsCreateComponent } from './components/news-create/news-create.component'

import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
registerLocaleData(en)

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ServerErrorComponent } from './components/server-error/server-error.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component'

const icons: IconDefinition[] = [
    UserOutline,
    LogoutOutline,
    LoginOutline,
    TeamOutline,
    HomeOutline,
    ThunderboltOutline,
    SettingFill,
    FireFill,
    HourglassFill,
    SmileFill,
    TrophyFill,
    LockOutline,
    DownOutline,
    FileTextOutline,
    FileTextFill,
    ThunderboltFill,
    SettingOutline,
    CheckOutline,
    PlusSquareOutline,
    DeleteOutline,
    EyeOutline,
    LikeOutline,
    LikeTwoTone,
    CommentOutline,
    DislikeOutline,
    DislikeTwoTone,
    LinkOutline,
    ProfileOutline,
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NewsManagementComponent,
        NewsComponent,
        NewsShowerComponent,
        NewsShowerStatisticComponent,
        NewsPageComponent,
        NewsEditComponent,
        NewsCreateComponent,
        NotFoundComponent,
        ServerErrorComponent,
        UserProfileComponent,
        UserProfileEditComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ app: appReducer }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule.forRoot(icons),
        AppRoutingModule,
        NzButtonModule,
        NzAvatarModule,
        NzDropDownModule,
        NzMenuModule,
        NzSpaceModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzStatisticModule,
        NzGridModule,
        NzDividerModule,
        NzTableModule,
        NzPopconfirmModule,
        NzTypographyModule,
        NzToolTipModule,
        NzCollapseModule,
        NzSelectModule,
        NzMessageModule,
        NzTabsModule,
        NzPaginationModule,
        NzModalModule,
        NzProgressModule,
        NzImageModule,
        NzTagModule,
        NzRadioModule,
        NzDrawerModule,
        NzListModule,
        MarkdownModule.forRoot(),
        NzCommentModule,
        NzEmptyModule,
        NzSpinModule,
        NzBadgeModule,
        NzPopoverModule,
        NzResultModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
