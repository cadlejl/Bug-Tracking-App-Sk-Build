"use strict";
function forbiddenStringValidator(strReg /*Regular expression: a way of defining a pattern of a string.
    We use it to test the value of our form control by passing it in as a
    parameter when we apply the validator. */) {
    return function (/* passing in by default */ control) {
        // Value of form control or group we're getting in
        var str = control.value;
        // Does the parameter match the pattern of the RegExp? (boolean)
        // "true" makes it invlaid.
        var invalid = strReg.test(str);
        // Returning a js object based on whether "invalid" is true or false.
        // Elvis op: if true, key + value (the key/value return type from above). 
        // If false, "null".
        return invalid ? { 'forbiddenString': { str: str } /*from form field*/ } : null;
    };
}
exports.forbiddenStringValidator = forbiddenStringValidator;
//# sourceMappingURL=forbidden-string.validator.js.map