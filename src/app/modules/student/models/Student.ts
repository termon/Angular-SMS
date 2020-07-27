import { TicketDto } from './ticket';

export class StudentDto {
    public id: number;
    public name: string;
    public course: string;
    public age: number;
    public email: string;
    public grade: number;
    public photoUrl: string;
    public tickets: TicketDto[] = [];

    constructor() {}

}

