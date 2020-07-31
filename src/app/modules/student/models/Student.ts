export class StudentDto {
    public id: number;
    public name: string;
    public course: string;
    public age: number;
    public email: string;
    public grade: number;
    public photoUrl: string;
    public tickets: TicketDto[] = [];
    public studentModules: StudentModuleDto[] = []

    constructor() {}

}

export class StudentModuleDto {
    public id: number;
    public mark: number;
    public studentId: number;
    public moduleId: number;
    public title: string;

    constructor() {}
 }

 export class TicketDto {
    public id: number;
    public studentId: number;
    public issue: string;
    public createdOn: Date = new Date(Date.now());
    public active: boolean = true;

    constructor() {}

 }