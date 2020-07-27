import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of  } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { StudentDto } from '../models/Student';
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
    this.load();
  }

  load(): void {
    this.loadingService.loadingOn();
    this.getStudents().subscribe(r => {
      // simulated delay to test loading spinner
      setTimeout(() => {
        console.log('studentservice loading', r);
        this.students = r;
        this.studentsSubject$.next(this.students);
        this.loadingService.loadingOff();
      }, 1000);

    });
  }

  clear(): void {
    this.students = [];
    console.log('studentservice clearing');
    this.studentsSubject$.next(this.students);
  }

  add(s: StudentDto) {
    return this.addStudent(s).pipe(
      tap( r => this.load())
      // tap(n => this.studentSubject$.next([...this.students, n]))
    );
  }

  update(s: StudentDto ) {
    return this.updateStudent(s).pipe(
      tap( r => this.load())
      // tap(u => this.studentSubject$.next([...this.students.filter(e => e.id !== u.id), u]))
    );
  }

  delete(id: number) {
    return this.deleteStudent(id).pipe(
      tap( r => this.load())
      // tap(() => this.studentSubject$.next([...this.students.filter(e => e.id !== id)]))
    );
  }

  get(id: number): Observable<StudentDto> {
    return this.getStudent(id).pipe(tap(s => this.currentSubject$.next(s)));
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

}
