import {Routes} from '@angular/router';
import { ProjectsComponent } from './_start-page/projects/projects.component';
import { ProjectsResolver } from './_resolvers/projects.resolver';
import { Project_mainComponent } from './selected_project/project_main/project_main.component';
import { ProjectResolver } from './_resolvers/project.resolver';
import { ApplicationsComponent } from './applications/applications/applications.component';
import { ApplicationsResolver } from './_resolvers/applications.resolver';
import { ProjectPlanComponent } from './selected_project/projectPlan/projectPlan.component';
import { AcceptedStudentsResolver } from './_resolvers/acceptedStudents.resolver';
import { ProjectPlanResolver } from './_resolvers/projectPlan.resolver';
import { StudentApplicationComponent } from './applications/studentApplication/studentApplication.component';
import { StudentsResolver } from './_resolvers/students.resolver';
import { EmployeeAuthComponent } from './_start-page/employeeAuth/employeeAuth.component';

export const appRoutes: Routes = [
    {path: '', component: EmployeeAuthComponent},
    {path: 'projects', component: ProjectsComponent, resolve: {projects: ProjectsResolver}},
    {path: 'projects/:id', component: Project_mainComponent, resolve: {project: ProjectResolver}},
    {path: 'projects/:id/applications', component: ApplicationsComponent,
        resolve: {project: ProjectResolver, applications: ApplicationsResolver}},
    {path: 'projects/:id/projectplan', component: ProjectPlanComponent,
        resolve: {project: ProjectResolver, students: AcceptedStudentsResolver, projectPlan: ProjectPlanResolver}},
    {path: 'application/:id', component: StudentApplicationComponent,
        resolve: {project: ProjectResolver, students: StudentsResolver}}
]