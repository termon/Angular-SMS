import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject  } from 'rxjs';
import {  shareReplay, tap } from 'rxjs/operators';

import { CloseTicketDto, StudentDto, TicketDto } from '../models/student';
import { LogService } from '@app/core/services/log.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root', // makes it a singleton
})
export class StudentService {
  private baseUrl = environment.apiUrl ?? 'https://localhost:5001';

  private students: StudentDto[] = [];
  private current: StudentDto = new StudentDto();

  private studentsSubject$ = new BehaviorSubject<StudentDto[]>(this.students);
  private currentSubject$ = new BehaviorSubject<StudentDto>(this.current);
  private errorSubject$ = new Subject<string>();

  students$ = this.studentsSubject$.asObservable();
  current$ = this.currentSubject$.asObservable();
  // a global errorSubject that components can subscribe to if they want to access errors
  // not strictly necessary given errors are handled using global HttpErrorInterceptor
  error$ = this.errorSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private log: LogService
  ) {
    this.log.info('StudentService Created....')
  }

  // update observable students$ stream with data from api
  loadStudents(): void {
    this.getStudents().subscribe(
      r => {
          this.log.info('Studentservice', 'loading students', r);
          this.students = r;
          this.studentsSubject$.next(this.students);
      },
      e => {
         this.log.error('Student Service', 'loading students', e);
         this.errorSubject$.next(e.detail)
      }
    );
  }

  // update observable current$ student stream with data from api
  loadCurrent(id: number): void {
    this.getStudent(id).subscribe(
      s => {
          this.log.info('Studentservice', 'loading student', s);
          this.current = s;
          this.currentSubject$.next(this.current);
      },
      e => {
        this.log.error('Student Service', 'loading student', e);
        this.errorSubject$.next(e.detail)
      }
    );
  }

  clear(): void {
    this.students = [];
    this.current = new StudentDto();
    this.log.info('Studentservice', 'Clear');
    this.studentsSubject$.next(this.students);
    this.currentSubject$.next(this.current);
  }

  add(s: StudentDto): Observable<StudentDto> {
    return this.addStudent(s).pipe(
      tap(
        r => {
          this.log.info('StudentService', 'add', s);
          this.students = [...this.students, s];
          this.studentsSubject$.next(this.students)
          //this.loadStudents();
        },
        e => {
          this.log.error('StudentService', 'add', e);
          this.errorSubject$.next(e.detail)
        }
      )
    );
  }

  update(s: StudentDto ): Observable<StudentDto> {
    return this.updateStudent(s).pipe(
      tap(
        r => {
          this.log.info('StudentService', 'update', s);
          this.current = r;
          this.currentSubject$.next(this.current)
          //this.loadStudents();
        },
        e => {
          this.log.error('StudentService', 'update', e);
          this.errorSubject$.next(e.detail)
        }
      )
    );
  }

  delete(id: number): Observable<boolean> {
    return this.deleteStudent(id).pipe(
      tap(
        r => {
          //this.loadStudents();
          this.students = [...this.students.filter(s => s.id !== id)];
          this.studentsSubject$.next(this.students);
          this.log.info('StudentService', 'delete', id);
        },
        e => {
          this.log.error('StudentService', 'delete', id);
          this.errorSubject$.next(e.detail)
        }
      )
    );
  }

  close(dto: CloseTicketDto): Observable<TicketDto> {
    return this.closeTicket(dto)
      .pipe(
        tap(
          t => {
            this.log.info('StudentService', 'close ticket', dto.id);
            this.loadCurrent(t.studentId);
          },
          e => {
            this.log.error('StudentService', 'close ticket', dto.id);
            this.errorSubject$.next(e.detail)
          }
        )
      );
  }

  verifyEmailAvailable(email: string, id?: number): Observable<boolean> {
    return this.emailIsAvailable(email, id);
  }

  // ------------------ Web API Requests -------------------------
  private getStudents(): Observable<StudentDto[]> {
      return this.http.get<StudentDto[]>(`${this.baseUrl}/api/student`);
  }

  private getStudent(id: number): Observable<StudentDto> {
    return this.http.get<StudentDto>(`${this.baseUrl}/api/student/${id}`);
        // use shareReplay to avoid duplicate http call by subscriber when observable returned
        //.pipe(shareReplay());
  }

  private addStudent(student: StudentDto): Observable<StudentDto> {
    return this.http.post<StudentDto>(`${this.baseUrl}/api/student`, student);
  }

  private updateStudent(student: StudentDto): Observable<StudentDto> {
    return this.http.put<StudentDto>(`${this.baseUrl}/api/student/${student.id}`, student);
  }

  private deleteStudent(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/student/${id}`);
  }

  private emailIsAvailable(email: string, id?: number): Observable<boolean> {
    if (id === undefined) {
      return this.http.get<boolean>(`${this.baseUrl}/api/student/verify/${email}`);
    } else {
      return this.http.get<boolean>(`${this.baseUrl}/api/student/verify/${email}/${id}`);
    }
  }

  private closeTicket(dto: CloseTicketDto): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.baseUrl}/api/ticket/close/${dto.id}`, dto );
  }

}
