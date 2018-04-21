// Data Model

export class Bug {
    constructor(
        public id: string,
        public title: string,
        public status: number,
        public severity: number,
        public description: string,
        public createdBy: string,
        public createdDate: number, // epoch time or UNIX time
        public updatedBy?: string,
        public updatedDate?: number
    ) { }
}