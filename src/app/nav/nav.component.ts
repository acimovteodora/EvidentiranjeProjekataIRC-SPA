import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../_model/employee';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentEmployee: Employee;


  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.currentEmployee = this.authService.employee;
  }



  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    this.authService.decodedToken = null;
    this.authService.employee = null;
    this.alertify.message('Odjavili ste se!');
    this.router.navigate(['/']);
  }

  

  loggedIn() {
    if (this.router.url === '/application/20002' || this.router.url === '/application/20003' || this.router.url === '/application/30002')
      return false;
    return this.authService.loggedIn();
  }
}
