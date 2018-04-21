/*** Shared Module ***/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    // Modules: for use in this module (not required for export)
    imports: [ CommonModule ],

    // Directives (pipes, components) for use in this module, or export
    declarations: [ ],

    // Make modules and directives available to other modules
    exports: [ CommonModule ]
})
export class SharedModule { }