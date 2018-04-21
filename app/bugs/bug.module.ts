/*** Feature Module ***/

// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugRoutingModule } from './bug-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { BugListComponent } from './bug-list/bug-list.component';
import { BugDetailComponent } from './bug-detail/bug-detail.component';

// Service
import { BugService } from './service/bug.service';

@NgModule({
    imports: [ 
        SharedModule, 
        BugRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ 
        BugListComponent, 
        BugDetailComponent
    ],
    exports: [ ],
    providers: [ BugService ]
})
export class BugModule { } 