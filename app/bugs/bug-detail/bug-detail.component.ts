import { Component, OnInit, /*Input*/ } from '@angular/core';
import { 
    // To become a directive bound in template to <form> and set = to 
    // private property in this class. 
    FormGroup, 

    FormControl, 
    Validators, 

    // A different way to create a reactive form. Can trim down syntax.
    // Injected
    FormBuilder 

} from '@angular/forms';

// Going to use the getBug() method.
// Injected
import { BugService } from '../service/bug.service';

// Need to build currentBug
import { Bug } from '../model/bug';

import { STATUS, SEVERITY } from '../../shared/constant/constants';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';
import { NgPlural } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: [ 'bug-detail.component.css' ]
})
export class BugDetailComponent implements OnInit {
    // Property bound in template; attr. bound in bug-list template
    // for triggering.
    private modalId = "bugModal";
    
    private bugForm: FormGroup;
    private statuses = STATUS;
    private severities = SEVERITY;
    private statusArr: string[] = [];
    private severityArr: string[] = [];

    // May need to populate with existing bug.
    /* Passing an existint bug into the form for edit: Form controls don't have 
    two-way binding set up with currentBug, as would be the case with a template 
    drivin form. We just have form controls linked directly to properties in 
    BugForm Technique in configureForm() method below. Therefore 
     */
    /*@Input()*/private currentBug = new Bug(
        null, 
        null, 
        this.statuses.Logged, 
        this.severities.Severe,
        null, 
        null, 
        null, 
        null, 
        null
    );

    constructor(private formB: FormBuilder, private bugService: BugService) { }

// OnInit method = component lifecycle hook: "Each stage in the component 
// (directive) lifecycle has a lifecycle hook (8 hooks) that you can hook 
// into and perform some action. OnInit is one of those hooks. It's hit 
// right after component initialization. NgOnInit is an Angular method that
// runs when the OnInit hook is hit. Perfect place to bring in the data you 
// need for a component."
    ngOnInit() {
        // Lecture 129
        this.statusArr = Object.keys(this.statuses).filter(Number);
        this.severityArr = Object.keys(this.severities).filter(Number);

        this.configureForm();
    }

    // In a template drivin form, this is what Angular does in the background.
    // Reactive forms provide more control and make it more manageable.
    // https://angular.io/guide/reactive-forms
    // Optional bug parameter is for template bug edit click event.
    configureForm(bug?: Bug) {
            
        // First form technique: commented out to try FormBuilder
        // // Bound to form element in template to let Angular know it has a model.
        // // Create new form group
        // this.bugForm = new FormGroup({
        //     title: new FormControl(
        //         // Form control validators: states (valid, invalid) viewable 
        //         // in console. Three properties on a form define the "state" of 
        //         // the form (or any form control): valid or invalid, touched or 
        //         // untouched (clicked out), pristine or dirty (changed). Angular 
        //         // classes automatically applied to these states all easy styling.

        //         null,/* no initial value for the validators parameter*/ 
        //         [
        //             // Built in validator
        //             Validators.required,

        //             // Custom validator 
        //             forbiddenStringValidator(
        //                 /*takes the form control in by default*/

        //                 // Define our regular expression (between two forward 
        //                 // slashes, which are like two quotes for a string).
        //                 // i = regular expression flag saying to ignore case
        //                 /puppy/i
        //             )
        //         ]
        //         /*
        //         this.currentBug.title, 
        //         [Validators.required, 
        //             forbiddenStringValidator(/puppy/i)
        //         ]*/),
        //     status: new FormControl(1, Validators.required
        //         // this.currentBug.status, 
        //         // Validators.required
        //     ),
        //     severity: new FormControl(1, Validators.required
        //         // this.currentBug.severity, 
        //         // Validators.required
        //     ),
        //     description: new FormControl(
        //         null, Validators.required
        //         // this.currentBug.description, 
        //         // Validators.required
        //     )
        // });

        // This allowed for coupling too tight (see lecture 123); edited bug
        // only created new bug, but first appeared to edit prior to refresh. 
        // Need new if below. This largely due to modal and working in one 
        // screen as opposed to another page. So "now we're just creating a 
        // whole new instance si there's nothing left over, no ties or anything 
        // like that; so it's all just fresh. That's all it is." This doesn't 
        // solve the duplication, it just stops it from appearing to edit 
        // before refresh. The we add undateBug() below. Note though that once 
        // we fixed it from pretending to update the form, instructor pointed
        // out that IT WAS updated in the database! But that update was just not 
        // reflected in the form. WTF?!! See BugService.changedListener() for
        // bringing in changes.
        // if (bug) {
        //     this.currentBug = bug;
        // }
        if (bug) {
            this.currentBug = new Bug(
                bug.id,
                bug.title,
                bug.status,
                bug.severity,
                bug.description,
                bug.createdBy,
                bug.createdDate,
                bug.updatedBy,
                bug.updatedDate
            );
        }

        // FormBuilder technique
        // Create new form group
        /* Prior to wireing currentBug to bugForm:
        Flow: formGroup is linked to form in template through data binding and 
        is set equal to bugForm, a FormGroup, which contains a FormBuilder.group, 
        and the form control attributes pass the corresponding field entries into 
        bugForm(s) formB.group properties. Form submission calls submitForm(), 
        which calls addBug(). Then bugForm properties are passed into currentBug 
        (data model) in the addBug() method of this class, which calls 
        addBug(currentBug) in bug.service (see bugService.addBug() to continue
        flow).
        The task is to create two way binding between form and configureForm().
        Instructor says wiring in currentBug works the first time, but not 
        after. I don't know why. I'm gonna just run with it for now to get through
        the course and figure it later. */
        this.bugForm = this.formB.group({
            title: [
                this.currentBug.title/*null*/, 
                [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status/*1*/, Validators.required],
            severity: [this.currentBug.severity/*1*/, Validators.required],
            description: [this.currentBug.description/*null*/, Validators.required]
        });
    }

    // For creating bugs or adding/editing bugs.
    submitForm() {
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];
        /*this.addBug();*/

        /* Now, how do we differentiate between adding and editing a bug? A key 
        differece between the two is an edited bug has an id (firebase key),
        and an added bug does not. Therefore: */
        if (this.currentBug.id) {
            this.updateBug();
        } else {
            this.addBug();
        }
        /* ^^^ This all does suggest though that what I said before about dbRef
        bringing in a unique id is incorrect. We needed .key to bring that in. */
        
        // This has to be moved due to modal issue addressed in lecture 130
        // this.freshForm();
    }

    // Same name as method in bug-service.ts. Taking empty properties from model
    // and filling them with corresponding form properties.
    addBug() {
        // These put in submitForm() instead when updateBug method was created.
        // These need to occur in updateBug as well, so we'll do it when we 
        // submitForm() instead.
        // this.currentBug.title = this.bugForm.value["title"];
        // this.currentBug.status = this.bugForm.value["status"];
        // this.currentBug.severity = this.bugForm.value["severity"];
        // this.currentBug.description = this.bugForm.value["description"];
        this.bugService.addBug(this.currentBug);
        /*this.freshForm();*/
    }

    // This added in after decoupling in if statemant in configureForm().
    updateBug() {
        this.bugService.updateBug(this.currentBug);
        /*this.freshForm();*/
    }

    freshForm() {
        this.bugForm.reset({ 
            status: this.statuses.Logged, 
            severity: this.severities.Severe 
        });
        
        this.cleanBug();
    }
    
    cleanBug() {
        this.currentBug = new Bug(
            null, 
            null, 
            this.statuses.Logged, 
            this.severities.Severe, 
            null, 
            null, 
            null, 
            null, 
            null
        );
    }

}