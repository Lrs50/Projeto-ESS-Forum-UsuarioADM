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
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { IconDefinition } from '@ant-design/icons-angular'
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
    LikeFill,
    EyeTwoTone,
    FieldTimeOutline,
} from '@ant-design/icons-angular/icons'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { NewsManagementComponent } from './components/news-management/news-management.component'
import { appReducer } from './app.store'
import { NewsComponent } from './components/news/news.component'
import { NewsShowerComponent } from './components/news-shower/news-shower.component'
import { NewsPageComponent } from './components/news-page/news-page.component'
import { NewsEditComponent } from './components/news-edit/news-edit.component'
import { NewsCreateComponent } from './components/news-create/news-create.component'

import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
registerLocaleData(en)

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ServerErrorComponent } from './components/server-error/server-error.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component'
import { SingupComponent } from './components/singup/singup.component'
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config'
import { ArtistPageComponent } from './components/artist-page/artist-page.component'
import { CommonUsersComponent } from './components/common-users/common-users.component'
import { ArtistsManagementComponent } from './components/artists-management/artists-management.component'
import { ArtistsCreateComponent } from './components/artists-create/artists-create.component'
import { ArtistComponent } from './components/artist/artist.component'

const ngZorroConfig: NzConfig = {
    theme: {
        primaryColor: '#006aff',
    },
}

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
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NewsManagementComponent,
        NewsComponent,
        NewsShowerComponent,
        NewsPageComponent,
        NewsEditComponent,
        NewsCreateComponent,
        NotFoundComponent,
        ServerErrorComponent,
        UserProfileComponent,
        UserProfileEditComponent,
        SingupComponent,
        ArtistPageComponent,
        CommonUsersComponent,
        ArtistsManagementComponent,
        ArtistsCreateComponent,
        ArtistComponent,
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
        NzCommentModule,
        NzEmptyModule,
        NzSpinModule,
        NzBadgeModule,
        NzPopoverModule,
        NzResultModule,
        NzAlertModule,
        NzRadioModule,
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: NZ_CONFIG, useValue: ngZorroConfig },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
