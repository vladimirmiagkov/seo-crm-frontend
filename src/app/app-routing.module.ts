import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'dashboard',  component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  {path: 'login', component: LoginComponent},
  //{path: '', component: HomeComponent, canActivate: [AuthGuard]},

  //{path: '**', redirectTo: ''} // defaul 'all not matched' redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}