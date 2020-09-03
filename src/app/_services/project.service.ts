import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../_model/project';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl + '/project/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getByID(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + id);
  }

  getByCriteria(criteria: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + criteria);
  }
}
