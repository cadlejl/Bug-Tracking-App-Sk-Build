// Component
import { Component, OnInit } from '@angular/core';

// Service
import { BugService } from '../service/bug.service';

// Data model
import { Bug } from '../model/bug';

@Component({
    // For systemjs to sort out the paths for external template and styles
    moduleId: module.id,

    // Note: no components going directly to app.component
    selector: 'bug-list',
    
    templateUrl: 'bug-list.component.html',
    styleUrls: [ 'bug-list.component.css']
})
export class BugListComponent implements OnInit {

    // Initialize and empty Bug array
    private bugs: Bug[] = [];

    constructor(private bugService: BugService) { }

    ngOnInit() {
        this.getAddedBugs();
        this.getUpdatedBugs();
    }

    getAddedBugs() {
        this.bugService.getAddedBugs().subscribe(

            // I think we're just calling it bug to match what it's getting
            // and where it's getting it from.
            /*anonymous function(bug: any): void*/
            bug => {
                // Pushing newBug from BugService onto bugs, which is a Bug array.
                this.bugs.push(bug);
            },
            err => {
                console.error("Unable to get added bug - ", err);
            }
        );
    }

    // Lecture 125
    getUpdatedBugs() {
        this.bugService.changedListener().subscribe(
            updatedBug => {
                // .map iterates through every element in the array and returns 
                // everything it finds as an array.
                const bugIndex = this.bugs.map(
                    index => index.id
                ).indexOf(
                    updatedBug['id']
                );
                this.bugs[bugIndex] = updatedBug;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }
}