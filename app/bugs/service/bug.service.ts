/*** Service ***/

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// Reference for injection
import { FirebaseConfigService } from '../../core/service/firebase-config.service';

// Data model
import { Bug } from '../model/bug';

@Injectable()

export class BugService {
    // Injected in constructor.
    // .ref('/bugs'): Reference to database at "/bugs" endpoint (alt: .ref().child('bugs'))
    // I think this is a snapshot
    private bugsDbRef = this.fb_ConServ.database.ref('/bugs');

    constructor(
        // Dependency Injection: inject an instance of FirebaseCongigService
        private fb_ConServ: FirebaseConfigService
    ) { }

    getAddedBugs(): Observable<any> {
        return Observable.create(
            obs => {
                
                // Listener
                this.bugsDbRef.on(
                    'child_added', 
                
                    // callback
                    bug => {
                        /* val(): extracts the contents of this snapshot and 
                        converts it into a js object. We're getting the data 
                        back (callback), running this (bug.val()) method on it, 
                        and passing all that to whatever subscribes to this 
                        observable. "bug.val()" creates a js object, "bug.val() 
                        as Bug" creates a custom (casting) js object based on 
                        the data model.*/

                        // Cast to data model then replace bug.val() with custom object.
                        const newBug = bug.val() as Bug;
                    
                        // firebase child key for editing existing bugs. It's 
                        // undesirable to pass the id back up to firebase with 
                        // the bug because we don't want to save the id within
                        // the object in firebase (two instances of it). We just
                        // need the reference.
                        newBug.id = bug.key;

                        // Presumably could have just done "as Bug" here.
                        obs.next(newBug /*bug.val()*/);
                    },
                    err => {
                        obs.throw(err);
                    }
                );
            }
        );
    }

    // Once false edit issue was solved, we add this method to bring in actual 
    // changes. Same or similar syntax to getAddedBugs().
    changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on(
                'child_changed', 
                bug => {
                const updatedBug = bug.val() as Bug;
                updatedBug.id = bug.key;
                obs.next(updatedBug);
            },
            err => {
                obs.throw(err);
            });
        });
    }

    // Called by BugDetailComponent.addBug(this.currentBug).
    /* So . . . I think this is taking our current database reference 
    (bugsDbRef (snapshot)), which holds a new child with unique identifier, 
    appends the push() method, passes it into a property, and calls the set 
    method on the snapshot with new child and unique identifier, sticks the 
    form info in the new child properties . . . and then what? I think it 
    sends the new bug back to firebase which drops in the new bug, fireing off
    our listener . . . where? Oh shit! Here! It's righ on top of me in 
    getAddedBugs() */
    addBug(bug: Bug) {
        // .push() creates a new unique identifier
        const newBugRef = this.bugsDbRef.push();

        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Jaime',
            createdDate: Date.now() // Epoch time
        }).catch(
            err => console.error("Unable to add bug to Firebase - ", err)
        );
    }

    // Linking bug.id to the firebase key in getAddedBugs() allows this method
    updateBug(bug: Bug) {
        const currentBugRef = this.bugsDbRef.child(bug.id);

        // So not to pass the id back to firebase
        bug.id = null;
        
        bug.updatedBy = "Tom Tickle";
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    }
}