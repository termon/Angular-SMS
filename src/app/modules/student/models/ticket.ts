export class TicketDto {
    public id: number;
    public studentId: number;
    public issue: string;
    public createdOn: Date = new Date(Date.now());
    public active: boolean = true;

    constructor() {}

 }
 