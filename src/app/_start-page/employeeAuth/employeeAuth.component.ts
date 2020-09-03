import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employeeAuth',
  templateUrl: './employeeAuth.component.html',
  styleUrls: ['./employeeAuth.component.css']
})
export class EmployeeAuthComponent implements OnInit {
  user: any = {};

  constructor(private router: Router,
              private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() { }

  login(f: NgForm) {
    if (this.authService.loggedIn()) {
      this.alertify.error('Vec ste ulogovani!');
    }
    this.authService.login(this.user).subscribe(next => {
      this.alertify.success('Успешно сте се улоговали.');
      this.router.navigate(['/projects']);
    }, error => {
      this.alertify.error('Дошло је до грешке. Покушајте поново!');
    }, () => { });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    this.alertify.message("Успешно сте се одјавили.");
    this.router.navigate(['/']);
  }
}
