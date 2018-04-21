/*** Core module: Singleton Services ***/

import { 
    NgModule, 
    
    // Allow module to configure and provide it's own services
    ModuleWithProviders, 
    
    // Allows a second instance to error
    Optional, SkipSelf 
} from '@angular/core';

// Services
import { FirebaseConfigService } from './service/firebase-config.service';

@NgModule({
    imports: [ ],
    declarations: [ ],
    exports: [ ]
})
export class CoreModule {
    constructor(
        // "Inject and instance of CoreModule IF another instance doesn't exist"

        // Marks dependency as optional: 
        @Optional()

        // Checks injector hierarchy for another instance of itself
        @SkipSelf() 

        parentModule: CoreModule
    ) {
        // "if" parentModule already contains an instance of CoreModule
        // (i.e. if parameter is not null), CoreModule exists.
        if (parentModule) {
            throw new Error(
                "CoreModule exists already. Only import in the root/app module"
            );
        }
    }

    // Add singletons here
    // Allows the creation of singletons. forRoot() locks CoreModule to the root
    // (won't work in other modules).
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [ FirebaseConfigService ]
        };
    }
}