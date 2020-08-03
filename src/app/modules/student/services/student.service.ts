import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of  } from 'rxjs';
import {  tap } from 'rxjs/operators';

import { StudentDto, TicketDto } from '../models/student';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { LogService } from 'src/app/core/services/log.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private log: LogService
  ) {
    this.loadStudents();
  }

  // update observable students$ stream with data from api
  loadStudents(): void {
    this.getStudents().subscribe(
      r => {
          this.log.debug('Studentservice', 'loading students', r);
          this.students = r;
          this.studentsSubject$.next(this.students);
      },
      e => this.log.error('Student Service', 'loading students', e),
    );
  }

  // update observable current$ student stream with data from api
  loadCurrent(id: number): void {
    this.getStudent(id).subscribe(
      s => {
          this.log.debug('Studentservice', 'loading student', s);
          this.current = s;
          this.currentSubject$.next(this.current);
      },
      e => {
          this.log.error('Studentservice', 'loading student', e);
      }
    );
  }

  clear(): void {
    this.students = [];
    this.log.debug('Studentservice', 'Clear');
    this.studentsSubject$.next(this.students);
  }

  add(s: StudentDto): Observable<StudentDto> {
    return this.addStudent(s).pipe(
      tap(
        r => {
          this.log.debug('StudentService', 'add', s);
          this.loadStudents();
        },
        e => {
          this.log.error('StudentService', 'add', e);
        }
      )
      // tap(n => this.studentSubject$.next([...this.students, n]))
    );
  }

  update(s: StudentDto ): Observable<StudentDto> {
    return this.updateStudent(s).pipe(
      tap(
        r => {
          this.log.debug('StudentService', 'update', s);
          this.loadStudents();
        },
        e => {
          this.log.error('StudentService', 'update', e);
        }
      )
      // tap(u => this.studentSubject$.next([...this.students.filter(e => e.id !== u.id), u]))
    );
  }

  delete(id: number): Observable<boolean> {
    return this.deleteStudent(id).pipe(
      tap(
        r => {
          this.loadStudents();
          this.log.debug('StudentService', 'delete', id);
        },
        e => {
          this.log.error('StudentService', 'delete', id);
        }
      )
      // tap(() => this.studentSubject$.next([...this.students.filter(e => e.id !== id)]))
    );
  }

  close(id: number): Observable<TicketDto> {
    return this.closeTicket(id)
      .pipe(
        tap(
          t => {
            this.log.debug('StudentService', 'close ticket', id);
            this.loadCurrent(t.studentId);
          },
          e => {
            this.log.error('StudentService', 'close ticket', id);
          }
        )
      );
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
