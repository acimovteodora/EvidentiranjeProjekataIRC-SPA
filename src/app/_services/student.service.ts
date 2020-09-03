import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../_model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = environment.apiUrl + '/student';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + '/' + id);
  }

  getByCriteria(criteria: string): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + '/criteria/' + criteria);
  }

  getAcceptedByProject(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl + '/project/' + id);
  }
}
