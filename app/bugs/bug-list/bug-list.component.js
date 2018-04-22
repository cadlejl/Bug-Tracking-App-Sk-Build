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
// Component
var core_1 = require('@angular/core');
// Service
var bug_service_1 = require('../service/bug.service');
var BugListComponent = (function () {
    function BugListComponent(bugService) {
        this.bugService = bugService;
        // Initialize and empty Bug array
        this.bugs = [];
    }
    BugListComponent.prototype.ngOnInit = function () {
        this.getAddedBugs();
        this.getUpdatedBugs();
    };
    BugListComponent.prototype.getAddedBugs = function () {
        var _this = this;
        this.bugService.getAddedBugs().subscribe(
        // I think we're just calling it bug to match what it's getting
        // and where it's getting it from.
        /*anonymous function(bug: any): void*/
        function (bug) {
            // Pushing newBug from BugService onto bugs, which is a Bug array.
            _this.bugs.push(bug);
        }, function (err) {
            console.error("Unable to get added bug - ", err);
        });
    };
    // Lecture 125
    BugListComponent.prototype.getUpdatedBugs = function () {
        var _this = this;
        this.bugService.changedListener().subscribe(function (updatedBug) {
            // .map iterates through every element in the array and returns 
            // everything it finds as an array.
            var bugIndex = _this.bugs.map(function (index) { return index.id; }).indexOf(updatedBug['id']);
            _this.bugs[bugIndex] = updatedBug;
        }, function (err) {
            console.error("Unable to get updated bug - ", err);
        });
    };
    BugListComponent = __decorate([
        core_1.Component({
            // For systemjs to sort out the paths for external template and styles
            moduleId: module.id,
            // Note: no components going directly to app.component
            selector: 'bug-list',
            templateUrl: 'bug-list.component.html',
            styleUrls: ['bug-list.component.css']
        }), 
        __metadata('design:paramtypes', [bug_service_1.BugService])
    ], BugListComponent);
    return BugListComponent;
}());
exports.BugListComponent = BugListComponent;
//# sourceMappingURL=bug-list.component.js.map