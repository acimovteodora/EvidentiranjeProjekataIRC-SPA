import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { Employee } from './_model/employee';
import { AlertifyService } from './_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FPIS-SPA';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      const employee: Employee = JSON.parse(localStorage.getItem('employee'));
      if(employee) {
        this.authService.employee = employee;
      }
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
