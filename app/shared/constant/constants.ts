// "enum allows us to define a list of strings that have a numerical value"
// Starting value is 0 by default, so we change it since we been using 1
export enum STATUS {
    'Logged' = 1,
    'Recreated',
    'In Progress',
    'Fixed',
    'Declined'
}

export enum SEVERITY {
    'Severe' = 1,
    'Medium',
    'Low',
    'Cosmetic'
}