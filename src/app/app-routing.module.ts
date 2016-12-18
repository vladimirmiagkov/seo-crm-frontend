import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './user/login/login.component';
import {AuthGuard} from './user/auth.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},

  //{path: '**', redirectTo: '', pathMatch: 'full'} // defaul 'all not matched' redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}