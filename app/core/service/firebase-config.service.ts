// Singleton Service

import { Injectable } from '@angular/core';

// Import from the Firebase module. 
// "*" = no individual exports; import whole thing
import * as firebase from 'firebase';// What kind of path is this?

// Add in the database part from the import above: 
// "We want to use the database part of the SDK". The SDK is broken down into 
// different sections and we have to tell it what parts we want to use.
require('firebase/database');

import { FIREBASE_CONFIG } from '../constant/constants';

// Always use @Injectable decorator for services whether needed or not
@Injectable()

export class FirebaseConfigService {

    // Property: Setting up a way for other parts of the system to access the 
    //           database. We need a reference to database so when we inject
    //           this service we will get that reference in the form of this 
    //           property.
    private _database: firebase.database.Database;

    constructor() {
        this.configureApp();
        this.configureDatabase();
    }

    // "getter" method (as opposed to "setter"): 
    // data encapsulation (data hiding): 
    // can't be modified outside its own class.
    // "database()" is seen as a property. Why?
    public get database() {
        return this._database;
    }

    // Configure this app to use Firebase.
    configureApp() {
        // "Initialize app passing the FIREBASE_CONFIG from constants.ts"
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    // Configure access to database? "Let's store that reference in a database 
    // property so other parts of the system can use it."
    configureDatabase() {
        // Set property to an instance of database.
        this._database = firebase.database();
    }
}