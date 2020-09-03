import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../_model/project';
import { ProjectService } from '../_services/project.service';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
    constructor(private projectService: ProjectService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Project> {
        return this.projectService.getByID(route.params['id'])
        .pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log(error);
                return of(null);
            })
        )
    }
}