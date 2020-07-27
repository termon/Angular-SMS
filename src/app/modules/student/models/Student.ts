
export class StudentDto {
    public id: number;
    public name: string;
    public course: string;
    public age: number;
    public email: string;
    public grade: number;
    public photoUrl: string;
    public tickets: TicketDto[] = [];

    constructor(){}

    
}

export class TicketDto {
    public id: number;
    public studentId: number;
    public issue: string;
    public on = new Date(Date.now());
    public active = true;

    constructor() {}

 }
