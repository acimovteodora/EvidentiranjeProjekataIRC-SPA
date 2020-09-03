import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectPlan } from '../_model/projectPlan';

@Injectable({
  providedIn: 'root'
})
export class ProjectPlanService {
  baseUrll = environment.apiUrl + '/projectplan/';

  constructor(private http: HttpClient) { }

  getByProject(id: any): Observable<ProjectPlan> {
    return this.http.get<ProjectPlan>(this.baseUrll + 'project/' + id);
  }

  getByCriteria(criteria: string): Observable<ProjectPlan[]> {
    return this.http.get<ProjectPlan[]>(this.baseUrll + 'criteria/' + criteria);
  }

  getById(id: any): Observable<ProjectPlan> {
    return this.http.get<ProjectPlan>(this.baseUrll + id);
  }

  delete(id: any) {
    return this.http.delete<ProjectPlan>(this.baseUrll + id);
  }

  insertProjectPlan(employeeId: number, data: ProjectPlan) {
    return this.http.post<ProjectPlan>(this.baseUrll + employeeId, data);
  }

  updateProjectPlan(data: ProjectPlan) {
    console.log(this.baseUrll + data.documentID);
    return this.http.put<ProjectPlan>(this.baseUrll + data.documentID, data);
  }
}
