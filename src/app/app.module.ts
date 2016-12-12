import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [ //Specifies a list of directives/pipes that belong to this module.
    AppComponent
  ],
  imports: [ //Specifies a list of modules whose exported directives/pipes should be available to templates in this module. This can also contain ModuleWithProviders.
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ //Defines the set of injectable objects that are available in the injector of this module.
    //BackendService,  
    //Logger,
  ],
  bootstrap: [ //Defines the components that should be bootstrapped when this module is bootstrapped. The components listed here will automatically be added to entryComponents.
    AppComponent
  ]
})
export class AppModule {
}
