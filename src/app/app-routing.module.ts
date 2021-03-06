import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './user/login/login.component';
import {AuthGuard} from './user/auth.guard';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {SitescheduleComponent} from './site/siteschedule/siteschedule.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'siteschedules', component: SitescheduleComponent, canActivate: [AuthGuard]},

  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  //{path: '**', redirectTo: '', pathMatch: 'full'} // defaul 'all not matched' redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    //{enableTracing: true} // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}