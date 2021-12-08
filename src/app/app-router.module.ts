import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { AuthGuard } from "./pages/auth/http/guards/auth.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { IndexComponent } from "./pages/index/index.component";
import { NewsComponent } from "./pages/news/news.component";


const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    {
        path: 'news', component: NewsComponent, canActivate: [AuthGuard],
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouterModule { }