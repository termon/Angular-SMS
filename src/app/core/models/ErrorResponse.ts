// export class ErrorResponse {
//     public errors: string[];
//     public message: string;
// }
export class ProblemDetails {          
    public type: string; 
    public title: string;
    public status: number;
    public detail: string; 
    public traceId: string;
    public instance: string;
    public errors: any[];
}