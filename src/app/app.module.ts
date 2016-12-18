import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './user/login/login.component';
import {AuthenticationService} from './user/authentication.service';

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
  ],
  providers: [ //Defines the set of injectable objects that are available in the injector of this module.
    //BackendService,  
    //Logger,
    AuthenticationService
  ],
  bootstrap: [ //Defines the components that should be bootstrapped when this module is bootstrapped. The components listed here will automatically be added to entryComponents.
    AppComponent,
  ]
})
export class AppModule {
}
