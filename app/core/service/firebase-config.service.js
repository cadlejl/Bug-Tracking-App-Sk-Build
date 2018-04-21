// Singleton Service
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
// Import from the Firebase module. 
// "*" = no individual exports; import whole thing
var firebase = require('firebase'); // What kind of path is this?
// Add in the database part from the import above: 
// "We want to use the database part of the SDK". The SDK is broken down into 
// different sections and we have to tell it what parts we want to use.
require('firebase/database');
var constants_1 = require('../constant/constants');
// Always use @Injectable decorator for services whether needed or not
var FirebaseConfigService = (function () {
    function FirebaseConfigService() {
        this.configureApp();
        this.configureDatabase();
    }
    Object.defineProperty(FirebaseConfigService.prototype, "database", {
        // "getter" method (as opposed to "setter"): 
        // data encapsulation (data hiding): 
        // can't be modified outside its own class.
        // "database()" is seen as a property. Why?
        get: function () {
            return this._database;
        },
        enumerable: true,
        configurable: true
    });
    // Configure this app to use Firebase.
    FirebaseConfigService.prototype.configureApp = function () {
        // "Initialize app passing the FIREBASE_CONFIG from constants.ts"
        firebase.initializeApp(constants_1.FIREBASE_CONFIG);
    };
    // Configure access to database? "Let's store that reference in a database 
    // property so other parts of the system can use it."
    FirebaseConfigService.prototype.configureDatabase = function () {
        // Set property to an instance of database.
        this._database = firebase.database();
    };
    FirebaseConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FirebaseConfigService);
    return FirebaseConfigService;
}());
exports.FirebaseConfigService = FirebaseConfigService;
//# sourceMappingURL=firebase-config.service.js.map