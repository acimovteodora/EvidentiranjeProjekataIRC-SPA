import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Application } from '../_model/application';
import { ApplicationService } from '../_services/application.service';

@Injectable()
export class ApplicationsResolver implements Resolve<Application[]> {
    constructor(private appService: ApplicationService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Application[]> {
        return this.appService.getByProject(route.params['id'])
        .pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log(error);
                return of(null);
            })
        );
    }
}