import { 
    //Validator function: what you run to validate the value of a field.
    ValidatorFn, 

    // Base class for FormControl and FormGroup. AbstractControl can be used
    // on controls or groups (more flexable).
    AbstractControl 
} from '@angular/forms';

export function forbiddenStringValidator(
    strReg: RegExp/*Regular expression: a way of defining a pattern of a string. 
    We use it to test the value of our form control by passing it in as a 
    parameter when we apply the validator. */
): ValidatorFn {
    return (/* passing in by default */control: AbstractControl): { 
        // Return type: a js object (including curly brackets {}). Key/value 
        //pairs with key if type string and value of type any.
        [key: string]: any 

    } => {
        // Value of form control or group we're getting in
        const str = control.value;

        // Does the parameter match the pattern of the RegExp? (boolean)
        // "true" makes it invlaid.
        const invalid = strReg.test(str);

        // Returning a js object based on whether "invalid" is true or false.
        // Elvis op: if true, key + value (the key/value return type from above). 
        // If false, "null".
        return invalid ? { 'forbiddenString': { str }/*from form field*/ } : null;
    }
}