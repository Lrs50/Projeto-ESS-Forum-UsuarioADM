import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { NewsManagementComponent } from './components/news-management/news-management.component'
import { NewsPageComponent } from './components/news-page/news-page.component'
import { NewsComponent } from './components/news/news.component'
import { NewsEditComponent } from './components/news-edit/news-edit.component'
import { NewsCreateComponent } from './components/news-create/news-create.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ServerErrorComponent } from './components/server-error/server-error.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component'
import { LoggedUserGuard } from './guards/logged-user.guard'
import { AdminUserGuard } from './guards/admin-user.guard'
import { SingupComponent } from './components/singup/singup.component'
import { NotLoggedGuard } from './guards/not-logged.guard'
import { ArtistComponent } from './components/artist/artist.component'
import { ArtistPageComponent } from './components/artist-page/artist-page.component'
import { ArtistsManagementComponent } from './components/artists-management/artists-management.component'
import { ArtistsCreateComponent } from './components/artists-create/artists-create.component'
import { CommonUsersComponent } from './components/common-users/common-users.component'
import { AdminManagementComponent } from './components/admin-management/admin-management.component'
import { AdminCreateComponent } from './components/admin-create/admin-create.component'
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component'

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'news', pathMatch: 'full' },   
            { path: 'news', component: NewsComponent},
            { path: 'common', component: CommonUsersComponent},
            { path: 'news/:id', component: NewsPageComponent },
            { path: 'management/news/edit/:id', component: NewsEditComponent, canActivate: [NotLoggedGuard, AdminUserGuard] },
            { path: 'management/news/create', component: NewsCreateComponent, canActivate: [NotLoggedGuard, AdminUserGuard] },
            { path: 'management/news', component: NewsManagementComponent, canActivate: [NotLoggedGuard, AdminUserGuard] },
            { path: 'user/:id', component: UserProfileComponent },
            { path: 'artist', component: ArtistComponent},
            { path: 'artist/:id', component: ArtistPageComponent },
            { path: 'management/artist', component: ArtistsManagementComponent, canActivate: [NotLoggedGuard, AdminUserGuard]},
            { path: 'management/artist/create', component: ArtistsCreateComponent, canActivate: [NotLoggedGuard, AdminUserGuard]},
            { path: 'user/:id/edit', component: UserProfileEditComponent, canActivate: [NotLoggedGuard] },
            { path: 'management/admin', component: AdminManagementComponent, canActivate: [NotLoggedGuard, AdminUserGuard]},
            { path: 'management/admin/create', component: AdminCreateComponent, canActivate: [NotLoggedGuard, AdminUserGuard] },
            { path: 'management/artist/edit/:id', component: ArtistEditComponent, canActivate: [NotLoggedGuard, AdminUserGuard] },
        
        ],
    },
    { path: 'login', component: LoginComponent, canActivate: [LoggedUserGuard] },
    { path: 'singup', component: SingupComponent, canActivate: [LoggedUserGuard] },
    { path: 'notfound', component: NotFoundComponent },
    { path: 'error', component: ServerErrorComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
