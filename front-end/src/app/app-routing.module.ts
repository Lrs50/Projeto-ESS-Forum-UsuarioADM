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

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'news', pathMatch: 'full' },
            { path: 'news', component: NewsComponent },
            { path: 'news/:id', component: NewsPageComponent },
            { path: 'management/news/edit/:id', component: NewsEditComponent, canActivate: [LoggedUserGuard, AdminUserGuard] },
            { path: 'management/news/create', component: NewsCreateComponent, canActivate: [LoggedUserGuard, AdminUserGuard] },
            { path: 'management/news', component: NewsManagementComponent, canActivate: [LoggedUserGuard, AdminUserGuard] },
            { path: 'user/:id', component: UserProfileComponent },
            { path: 'user/:id/edit', component: UserProfileEditComponent, canActivate: [LoggedUserGuard] },
        ],
    },
    { path: 'login', component: LoginComponent, canActivate: [LoggedUserGuard] },
    { path: 'notfound', component: NotFoundComponent },
    { path: 'error', component: ServerErrorComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
