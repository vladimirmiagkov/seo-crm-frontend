import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from './shared/api.service';
import {LoginComponent} from './user/login/login.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {AuthService} from './user/auth.service';
import {AuthGuard} from './user/auth.guard';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './user/user-list/user-list.component';

//PrimeNg
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';

@NgModule({
  imports: [ //Specifies a list of modules whose exported directives/pipes should be available to templates in this module. This can also contain ModuleWithProviders.
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    SharedModule, //PrimeNg
    ButtonModule, //PrimeNg
    InputTextModule, //PrimeNg
    InputTextareaModule, //PrimeNg
    CheckboxModule, //PrimeNg
    ListboxModule, //PrimeNg
    MultiSelectModule, //PrimeNg
    RadioButtonModule, //PrimeNg
    DropdownModule, //PrimeNg
    InputSwitchModule, //PrimeNg
    ToggleButtonModule, //PrimeNg
    SelectButtonModule, //PrimeNg
    SliderModule, //PrimeNg
    DialogModule, //PrimeNg
    ConfirmDialogModule, //PrimeNg
    DataTableModule, //PrimeNg
    CalendarModule, //PrimeNg
    GrowlModule, //PrimeNg

  ],
  declarations: [ //Specifies a list of directives/pipes that belong to this module.
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
  ],
  providers: [ //Defines the set of injectable objects that are available in the injector of this module. //Global services
    //Logger,
    ApiService,
    AuthService,
    AUTH_PROVIDERS,
    AuthGuard,
  ],
  bootstrap: [ //Defines the components that should be bootstrapped when this module is bootstrapped. The components listed here will automatically be added to entryComponents.
    AppComponent,
  ]
})
export class AppModule {
}
