/*** Service ***/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
// Reference for injection
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var BugService = (function () {
    function BugService(
        // Dependency Injection: inject an instance of FirebaseCongigService
        fb_ConServ) {
        this.fb_ConServ = fb_ConServ;
        // Injected in constructor.
        // .ref('/bugs'): Reference to database at "/bugs" endpoint (alt: .ref().child('bugs'))
        // I think this is a snapshot
        this.bugsDbRef = this.fb_ConServ.database.ref('/bugs');
    }
    BugService.prototype.getAddedBugs = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            // Listener
            _this.bugsDbRef.on('child_added', 
            // callback
            function (bug) {
                /* val(): extracts the contents of this snapshot and
                converts it into a js object. We're getting the data
                back (callback), running this (bug.val()) method on it,
                and passing all that to whatever subscribes to this
                observable. "bug.val()" creates a js object, "bug.val()
                as Bug" creates a custom (casting) js object based on
                the data model.*/
                // Cast to data model then replace bug.val() with custom object.
                var newBug = bug.val();
                //newBug.id = bug.key;
                // Presumably could have just done "as Bug" here.
                obs.next(newBug /*bug.val()*/);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    // changedListener(): Observable<any> {
    //     return Observable.create(obs => {
    //         this.bugsDbRef.on('child_changed', bug => {
    //             const updatedBug = bug.val() as Bug;
    //             updatedBug.id = bug.key;
    //             obs.next(updatedBug);
    //         },
    //         err => {
    //             obs.throw(err);
    //         });
    //     });
    // }
    // Called by BugDetailComponent.addBug(this.currentBug).
    /* So . . . I think this is taking our current database reference
    (bugsDbRef (snapshot)), which holds a new child with unique identifier,
    appends the push() method, passes it into a property, and calls the set
    method on the snapshot with new child and unique identifier, sticks the
    form info in the new child properties . . . and then what? I think it
    sends the new bug back to firebase which drops in the new bug, fireing off
    our listener . . . where? Oh shit! Here! It's righ on top of me in
    getAddedBugs() */
    BugService.prototype.addBug = function (bug) {
        // .push() creates a new unique identifier
        var newBugRef = this.bugsDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Jaime',
            createdDate: Date.now() // Epoch time
        }).catch(function (err) { return console.error("Unable to add bug to Firebase - ", err); });
    };
    BugService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], BugService);
    return BugService;
}());
exports.BugService = BugService;
//# sourceMappingURL=bug.service.js.map