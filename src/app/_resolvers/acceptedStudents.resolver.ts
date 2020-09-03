import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationService } from '../_services/application.service';
import { Student } from '../_model/student';
import { StudentService } from '../_services/student.service';

@Injectable()
export class AcceptedStudentsResolver implements Resolve<Student[]> {
    constructor(private studentService: StudentService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Student[]> {
        return this.studentService.getAcceptedByProject(route.params['id'])
        .pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log(error);
                return of(null);
            })
        );
    }
}