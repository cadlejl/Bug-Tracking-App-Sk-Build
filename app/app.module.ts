// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';

// Also provides access to BugRoutingModule
import { BugModule} from './bugs/bug.module';

// Test Routing
/*** Root Module ***/

import { AppRoutingModule } from './app-routing.module'; 

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [ 
        BrowserModule,
        BugModule,

        // Test Routing
        AppRoutingModule,

        // forRoot() brings in providers that CoreModule has provided and 
        // configured for itself
        CoreModule.forRoot()
     ],
    declarations: [ 
        AppComponent, 
        NavbarComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }