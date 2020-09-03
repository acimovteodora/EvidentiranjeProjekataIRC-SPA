import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../_model/project';
import { ProjectService } from '../_services/project.service';
import { ProjectPlan } from '../_model/projectPlan';
import { ProjectPlanService } from '../_services/projectPlan.service';

@Injectable()
export class ProjectPlanResolver implements Resolve<ProjectPlan> {
    constructor(private projectPlanService: ProjectPlanService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ProjectPlan> {
        return this.projectPlanService.getByProject(route.params['id'])
        .pipe(
            catchError(error => {
                return of(null);
            })
        )
    }
}