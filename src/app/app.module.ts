import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//PrimeNg
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
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
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';

// App
//import {AUTH_PROVIDERS} from 'angular2-jwt';
import {NotificationService} from './shared/notification.service';
import {NotificationComponent} from './shared/notification.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from './shared/api.service';
import {LoginComponent} from './user/login/login.component';
import {AuthService} from './user/auth.service';
import {AuthGuard} from './user/auth.guard';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {SitescheduleComponent} from './site/siteschedule/siteschedule.component';
import {SitescheduleDetailComponent} from './site/siteschedule/siteschedule-detail/siteschedule-detail.component';
import {SiteComponent} from './site/site/site.component';
import {DataBlockComponent} from './site/datablock/datablock.component';
import {DataBlockRowComponent} from './site/datablock/row/datablock-row.component';

@NgModule({
  imports: [ //Specifies a list of modules whose exported directives/pipes should be available to templates in this module. This can also contain ModuleWithProviders.
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    SharedModule, //PrimeNg
    MenuModule, //PrimeNg
    TieredMenuModule, //PrimeNg
    TooltipModule, //PrimeNg
    PaginatorModule, //PrimeNg
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
    DataListModule, //PrimeNg
  ],
  // Declarables are the class types — components, directives, and pipes — that you can add to a module's declarations list.
  // They're the only classes that you can add to declarations.
  // These classes must be declared in exactly one module of the application. Declare them in this module if they belong to this module.
  // Do not declare:
  // - a class that is already declared in another module, whether an app module, @angular module, or 3rd party module
  // - an array of directives imported from another module. For example, do not declare FORMS_DIRECTIVES from @angular/forms.
  // - module classes
  // - service classes
  // - non-Angular classes and objects such as strings, numbers, functions, entity models, configurations, business logic, and helper classes.
  declarations: [ //Specifies a list of directives/pipes that belong to this module.
    NotificationComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    SitescheduleComponent,
    SitescheduleDetailComponent,
    SiteComponent,
    DataBlockComponent,
    DataBlockRowComponent,
  ],
  providers: [ //Defines the set of injectable objects that are available in the injector of this module. //Global services
    //AUTH_PROVIDERS,
    NotificationService,
    ApiService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [ //Defines the components that should be bootstrapped when this module is bootstrapped. The components listed here will automatically be added to entryComponents.
    AppComponent,
  ]
})
export class AppModule {
}
