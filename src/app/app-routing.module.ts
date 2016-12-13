import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'dashboard',  component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  //{path: 'login', component: LoginComponent},
  //{path: '', component: HomeComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}