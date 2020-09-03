import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/employee/login';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  employee: any;

  constructor(private http: HttpClient) { }

  login(emp: any){
    return this.http.post(this.baseUrl, emp)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('employee', JSON.stringify(user.employee));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.employee = user.employee;
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
