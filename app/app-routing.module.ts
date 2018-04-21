// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Components
// Test Routing from bug-list.component.html, through AppModule 
// (inside imported AppRoutingModule), to <router-outlet> in 
// app.component.ts, to <my-app> in index.html 
// import { BugListComponent } from './bugs/bug-list/bug-list.component';

@NgModule({
    imports: [
        // Paths are defined here (url handling). 
        RouterModule.forRoot([

            // Root path (doesn't have to be a component).
            // { path: '', component: BugListComponent /* Test Routing to AppModule */ }
        ])
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }