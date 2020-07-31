import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of  } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { StudentDto, TicketDto } from '../models/student';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Injectable({
  providedIn: 'root', // makes it a singleton
})
export class StudentService {

  students: StudentDto[] = [];
  current: StudentDto = new StudentDto();

  private studentsSubject$ = new BehaviorSubject<StudentDto[]>(this.students);
  private currentSubject$ = new BehaviorSubject<StudentDto>(this.current);
  students$ = this.studentsSubject$.asObservable();
  current$ = this.currentSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loadingService.loadingOn();
    this.getStudents().subscribe(
      r => {
        // simulated delay to test loading spinner
        setTimeout(() => {
          console.log('studentservice loading students', r);
          this.students = r;
          this.studentsSubject$.next(this.students);
          this.loadingService.loadingOff();
        }, 1000);
    },
    e => {
      this.loadingService.loadingOff();
      console.log(e.message);
    });
  }

  clear(): void {
    this.students = [];
    console.log('studentservice clearing');
    this.studentsSubject$.next(this.students);
  }

  add(s: StudentDto) {
    return this.addStudent(s).pipe(
      tap( r => this.loadStudents())
      // tap(n => this.studentSubject$.next([...this.students, n]))
    );
  }

  update(s: StudentDto ) {
    return this.updateStudent(s).pipe(
      tap( r => this.loadStudents())
      // tap(u => this.studentSubject$.next([...this.students.filter(e => e.id !== u.id), u]))
    );
  }

  delete(id: number) {
    return this.deleteStudent(id).pipe(
      tap( r => this.loadStudents())
      // tap(() => this.studentSubject$.next([...this.students.filter(e => e.id !== id)]))
    );
  }

  loadCurrent(id: number): void {
    this.getStudent(id).subscribe(
      s => {
        this.currentSubject$.next(s);
        console.log('studentservice loading student', s);
      },
      e => console.log('studentservice error loading student', id)
    );
  }

  close(id: number): Observable<TicketDto> {
    return this.closeTicket(id)
      .pipe(tap(t => this.loadCurrent(t.studentId)));
  }

  verifyEmailAvailable(email: string, id?: number): Observable<boolean> {
    return this.emailIsAvailable(email, id);
  }

  // ------------------ Web API Requests -------------------------
  private getStudents(): Observable<StudentDto[]> {
      return this.http.get<StudentDto[]>('https://localhost:5001/api/student');
  }

  private getStudent(id: number): Observable<StudentDto> {
    return this.http.get<StudentDto>(`https://localhost:5001/api/student/${id}`);
  }

  private addStudent(student: StudentDto): Observable<StudentDto> {
    return this.http.post<StudentDto>('https://localhost:5001/api/student', student);
  }

  private updateStudent(student: StudentDto): Observable<StudentDto> {
    return this.http.put<StudentDto>(`https://localhost:5001/api/student/${student.id}`, student);
  }

  private deleteStudent(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`https://localhost:5001/api/student/${id}`);
  }

  private emailIsAvailable(email: string, id?: number): Observable<boolean> {
    if (id === undefined) {
      return this.http.get<boolean>(`https://localhost:5001/api/student/verify/${email}`);
    } else {
      return this.http.get<boolean>(`https://localhost:5001/api/student/verify/${email}/${id}`);
    }
  }

  private closeTicket(id: number): Observable<TicketDto> {
    return this.http.put<TicketDto>(`https://localhost:5001/api/ticket/close/${id}`, {});
  }

}
