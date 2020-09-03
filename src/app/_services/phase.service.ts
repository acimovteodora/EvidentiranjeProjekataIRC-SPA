import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Phase } from '../_model/phase';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {
  baseUrl = environment.apiUrl + '/phase/';

  constructor(private http: HttpClient) { }

  getByID(id: number): Observable<Phase> {
    return this.http.get<Phase>(this.baseUrl + id);
  }
}
