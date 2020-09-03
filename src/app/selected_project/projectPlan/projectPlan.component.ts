import { Component, OnInit, Input } from '@angular/core';
import { ProjectPlanService } from 'src/app/_services/projectPlan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { ProjectPlan } from 'src/app/_model/projectPlan';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Engagement } from 'src/app/_model/engagement';
import { Student } from 'src/app/_model/student';
import { Phase } from 'src/app/_model/phase';
import { title } from 'process';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { PhaseService } from 'src/app/_services/phase.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-projectPlan',
  templateUrl: './projectPlan.component.html',
  styleUrls: ['./projectPlan.component.css']
})
export class ProjectPlanComponent implements OnInit {
  project: Project;
  projectPlan: ProjectPlan;
  planForEdit: ProjectPlan;
  minDate: Date;
  modalRef: BsModalRef;
  newPhase = false;
  editPhase = false;
  index: number;
  phaseForEdit: Phase;
  bsConfig: Partial<BsDatepickerConfig>;

  //attributes of project plan
  students: Student[];
  phases: Phase[] = [];
  estimatedStartDate: Date;
  duration: number;
  note: string;


  constructor(private projectPlanService: ProjectPlanService,
              private route: ActivatedRoute,
              private router: Router,
              public modalService: BsModalService,
              private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.project = data['project'];
      this.students = data['students'];
      this.projectPlan = data['projectPlan'];
    });
    this.minDate = new Date(this.project.projectProposal.startDateProjectProposal);
    if (this.projectPlan != null) {
      this.planForEdit = this.projectPlan;
      this.fill();
    }
    this.bsConfig = {
      containerClass: 'theme-blue'
    }
  }

  fill() {
    this.note = this.projectPlan.note;
    this.duration = this.projectPlan.duration;
    this.estimatedStartDate = new Date(this.projectPlan.estimatedStartDate);
    this.projectPlan.phases.forEach(phase => {
      this.phases.push(phase);
    });
    // this.phases = this.projectPlan.phases;
  }
  clear() {
    this.note = undefined;
    this.duration = undefined;
    this.estimatedStartDate = undefined;
    this.phases = undefined;
  }

  save() {
    if (title !== undefined && this.duration !== undefined && this.estimatedStartDate !== undefined
      && this.phases !== undefined && this.phases !== null) {
      this.projectPlan = {
        title: 'ПЛАН ПРОЈЕКТА: ' + this.project.projectProposal.name,
        dateOfCompilation: new Date(),
        duration: this.duration,
        note: this.note,
        estimatedStartDate: this.estimatedStartDate,
        phases: this.phases,
        projectID: this.project.projectID
      };
      this.projectPlanService.insertProjectPlan(this.authService.decodedToken.nameid, this.projectPlan).subscribe(() => {
        this.alertify.success('Успешно је сачуван план пројекта!');
        this.router.navigate(['/projects/', this.project.projectID]);
      }, error => {
        this.alertify.error('Дошло је до грешке приликом чувања план пројекта!');
        this.projectPlan = null;
        console.log(error.message);
      });
      console.log('dss');
    } else {
      this.alertify.error('Нисте унели све неопходне информације!');
    }
  }

  edit() {
    if (title !== undefined && this.duration !== undefined && this.estimatedStartDate !== undefined
      && this.phases !== undefined && this.phases !== null) {
        if (this.isPlanEdited()) {
          this.planForEdit.estimatedStartDate = this.estimatedStartDate;
          this.planForEdit.note = this.note;
          this.planForEdit.duration = this.duration;
          this.planForEdit.phases = this.phases;
          this.projectPlanService.updateProjectPlan(this.planForEdit).subscribe(() => {
            this.alertify.success('Успешно сте изменили план пројекта!');
            this.router.navigate(['/projects/', this.project.projectID]);
          } , error => {
            this.alertify.error('Дошло је до грешке приликом измене плана пројекта!');
          });
        } else {
          this.alertify.error('Нисте направили измену у плану пројекта.');
        }
    } else {
      this.alertify.error('Нисте унели све неопходне информације.');
    }
  }

  isPlanEdited() {
    if ( this.duration === this.projectPlan.duration && this.note === this.projectPlan.note &&
      !this.checkDate(this.estimatedStartDate, new Date(this.projectPlan.estimatedStartDate))) {
        return false;
    }
    return true;
  }

  checkDate(date1: Date, date2: Date) {
    if (date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()) {
      return false;
    }
    return true;
  }

  delete() {
    this.projectPlanService.delete(this.projectPlan.documentID).subscribe(() => {
      this.alertify.success('Успешно је обрисан план пројекта!');
      this.router.navigate(['/projects/', this.project.projectID]);
      this.clear();
      this.projectPlan = undefined;
    }, error => {
      this.alertify.error('Дошло је до грешке приликом брисања плана пројекта!');
    });
  }


  addPhase() {
    this.phaseForEdit = null;
    this.newPhase = true;
    this.editPhase = false;
  }

  methodAddPhase(p: Phase) {
    if (p !== undefined) {
      this.phases.push(p);
    }
    this.newPhase = false;
  }

  editSelectedPhase(p: Phase, i: number) {
    this.editPhase = false;
    this.newPhase = false;
    this.phaseForEdit = p;
    this.editPhase = true;
    this.index = i;
  }
  methodEditPhase(p: Phase) {
    if (p !== undefined) {
      this.phases.forEach(phase => {
        if ( this.phases.indexOf(phase) === this.index ) {
          phase = p;
        }
      });
    }
    this.phaseForEdit = null;
    this.editPhase = false;
    this.index = -1;
  }

  deleteSelectedPhase(index: number) {
    this.phases.splice(index, 1);
  }


  back() {
    this.router.navigate(['projects/', this.project.projectID]);
  }
}
