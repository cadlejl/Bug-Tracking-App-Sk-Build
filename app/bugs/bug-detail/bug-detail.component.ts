import { Component, OnInit, Input } from '@angular/core';
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

// import { STATUS, SEVERITY } from '../../shared/constant/constants';

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
    // private statuses = STATUS;
    // private severities = SEVERITY;
    // private statusArr: string[] = [];
    // private severityArr: string[] = [];

    // May need to populate with existing bug.
    /* Passing an existint bug into the form for edit: Form controls don't have 
    two-way binding set up with currentBug, as would be the case with a template 
    drivin form. We just have form controls linked directly to properties in 
    BugForm Technique in configureForm() method below. Therefore 
     */
    @Input() currentBug = new Bug(
        null, 
        null,
        null,
        null, 
        /*this.statuses.Logged, 
        this.severities.Severe, */
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
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    }

    // In a template drivin form, this is what Angular does in the background.
    // Reactive forms provide more control and make it more manageable.
    configureForm(/*bug?: Bug*/) {

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
        // if (bug) {
        //     this.currentBug = new Bug(
        //         bug.id,
        //         bug.title,
        //         bug.status,
        //         bug.severity,
        //         bug.description,
        //         bug.createdBy,
        //         bug.createdDate,
        //         bug.updatedBy,
        //         bug.updatedDate
        //     );
        // }

        // FormBuilder technique
        // Create new form group
        /* Flow: formGroup is linked to form in template through data binding and 
        is set to bugForm, a FormBuilder group, and the form control attributes 
        pass the corresponding properties into bugForm. Form submission calls 
        submitForm(), which calls addBug(). Then bugForm properties are 
        passed into currentBug (data model) in the addBug() method of this class, 
        and currentBug() is passed to bug (parameter) in addBug() in bug.service */
        this.bugForm = this.formB.group({
            title: [
                /*this.currentBug.title*/null, 
                [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [/*this.currentBug.status*/1, Validators.required],
            severity: [/*this.currentBug.severity*/1, Validators.required],
            description: [/*this.currentBug.description*/null, Validators.required]
        });
    }

    // For creating bugs or adding/editing bugs.
    submitForm() {
        console.log(this.bugForm);// REMOVE
        this.addBug();
        // this.currentBug.title = this.bugForm.value["title"];
        // this.currentBug.status = this.bugForm.value["status"];
        // this.currentBug.severity = this.bugForm.value["severity"];
        // this.currentBug.description = this.bugForm.value["description"];
        // if (this.currentBug.id) {
        //     this.updateBug();
        // } else {
        //     this.addBug();
        // }
    }

    // Same name as method in bug-service.ts. Taking empty properties from model
    // and filling them with corresponding form properties.
    addBug() {
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];
        this.bugService.addBug(this.currentBug);
        this.freshForm();
    }

//     updateBug() {
//         this.bugService.updateBug(this.currentBug);
//     }

    freshForm() {
        this.bugForm.reset({ 
            status: 1/*this.statuses.Logged*/, 
            severity: 1/*this.severities.Severe*/ });
        // this.cleanBug();
    }
    
//     cleanBug() {
//         this.currentBug = new Bug(null, null, this.statuses.Logged, this.severities.Severe, null, null, null, null, null);
//     }

}