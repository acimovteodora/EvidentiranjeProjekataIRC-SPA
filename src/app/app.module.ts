import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ProjectsResolver } from './_resolvers/projects.resolver';
import { ProjectsComponent } from './_start-page/projects/projects.component';
import { ProjectService } from './_services/project.service';
import { ProjectResolver } from './_resolvers/project.resolver';
import { Project_mainComponent } from './selected_project/project_main/project_main.component';
import { ApplicationsComponent } from './applications/applications/applications.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationsResolver } from './_resolvers/applications.resolver';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectPlanComponent } from './selected_project/projectPlan/projectPlan.component';
import { PhaseComponent } from './selected_project/phase/phase.component';
import { AcceptedStudentsResolver } from './_resolvers/acceptedStudents.resolver';
import { ProjectPlanResolver } from './_resolvers/projectPlan.resolver';
import { StudentsResolver } from './_resolvers/students.resolver';
import { AlertifyService } from './_services/alertify.service';
import { StudentApplicationComponent } from './applications/studentApplication/studentApplication.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EmployeeAuthComponent } from './_start-page/employeeAuth/employeeAuth.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    Project_mainComponent,
    ApplicationsComponent,
    ProjectPlanComponent,
    PhaseComponent,
    StudentApplicationComponent,
    EmployeeAuthComponent,
      NavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/employee'],
      },
    })
  ],
  providers: [
    ProjectsResolver,
    ProjectService,
    ProjectResolver,
    ApplicationService,
    ApplicationsResolver,
    AcceptedStudentsResolver,
    ProjectPlanResolver,
    StudentsResolver,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('token');
}
