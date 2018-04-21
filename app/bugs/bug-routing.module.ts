// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { BugListComponent } from './bug-list/bug-list.component';

@NgModule({
    imports: [ 

        RouterModule.forChild([
            // paths don't reuire "/"
            // "path" works in child module bucause BugModule is 
            //      imported into AppModule
            // Paths hit in order
            { path: '', redirectTo: 'bugs', pathMatch: 'full' },
            { path: 'bugs', component: BugListComponent },
            { path: '**', redirectTo: 'bugs' }
    ]) 
],
    exports: [ RouterModule ],
})

export class BugRoutingModule { }