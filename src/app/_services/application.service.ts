import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../_model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  baseUrl = environment.apiUrl + '/application';

  constructor(private http: HttpClient) { }

  getByProject(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl + '/project/' + id);
  }

  getById(projectId: number, studentId: number): Observable<Application> {
    return this.http.get<Application>(this.baseUrl + '/' + projectId + '/' + studentId);
  }

  getAccepted(projectId: number): Observable<Application> {
    return this.http.get<Application>(this.baseUrl + '/' + projectId + '/students');
  }

  getByCriteriaForProject(id: number, criteria: string): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl+ '/' + id + '/criteria/' + criteria);
  }

  delete(projectId: any, studentId: any): Observable<Application> {
    return this.http.delete<Application>(this.baseUrl + '/' +  projectId + '/' + studentId);
  }

  editApplication(projectId: number, studentId: number, data: Application) {
    return this.http.put(this.baseUrl  + '/' + projectId + '/' + studentId, data);
  }

  insert(data: Application) {
    return this.http.post<Application>(this.baseUrl, data);
  }
}
