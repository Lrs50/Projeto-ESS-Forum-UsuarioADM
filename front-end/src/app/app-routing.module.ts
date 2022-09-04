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

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'news', pathMatch: 'full' },
            { path: 'news', component: NewsComponent },
            { path: 'news/:id', component: NewsPageComponent },
            { path: 'management/news/edit/:id', component: NewsEditComponent },
            { path: 'management/news/create', component: NewsCreateComponent },
            { path: 'management/news', component: NewsManagementComponent },
        ],
    },
    { path: 'login', component: LoginComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: 'error', component: ServerErrorComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
