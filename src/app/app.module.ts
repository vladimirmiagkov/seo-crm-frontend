import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {AuthService} from './user/auth.service';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {AuthGuard} from './user/auth.guard';
import {HomeComponent} from './home/home.component';
import {ApiService} from './shared/api.service';

@NgModule({
  imports: [ //Specifies a list of modules whose exported directives/pipes should be available to templates in this module. This can also contain ModuleWithProviders.
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [ //Specifies a list of directives/pipes that belong to this module.
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  providers: [ //Defines the set of injectable objects that are available in the injector of this module. //Global services
    //Logger,
    AuthService,
    AUTH_PROVIDERS,
    AuthGuard,
    ApiService,
  ],
  bootstrap: [ //Defines the components that should be bootstrapped when this module is bootstrapped. The components listed here will automatically be added to entryComponents.
    AppComponent,
  ]
})
export class AppModule {
}
