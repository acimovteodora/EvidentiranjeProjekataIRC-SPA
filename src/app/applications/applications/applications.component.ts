import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from 'src/app/_model/project';
import { ApplicationService } from 'src/app/_services/application.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/_model/application';
import { Student } from 'src/app/_model/student';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  project: Project;
  applications: Application[];
  application: Application;
  student: Student = null;
  odabran = false;
  selectedRow: number;
  modalRef: BsModalRef;
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  criteria = '';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private applicationService: ApplicationService,
              private route: ActivatedRoute,
              public modalService: BsModalService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data['project'];
      this.applications = data['applications'];
    });
    this.selected(null, 0, null);
    this.minDate = new Date(this.project.projectProposal.startDateProjectProposal);
    this.maxDate = new Date(this.minDate);
    this.maxDate.setDate(this.minDate.getDate() + this.project.projectProposal.daysDuration);
    this.bsConfig = {
      containerClass: 'theme-blue'
    }
  }

  save() {
      this.application.accepted = true;
      this.applicationService.editApplication(this.project.projectID, this.application.studentID, this.application)
      .subscribe(() => {
        this.alertify.success('Студент је прихваћен за рад на пројекту!');
        this.modalRef.hide();
      }, error => {
        this.alertify.error('Дошло је до грешке приликом прихватања студента!');
      });
  }

  update() {
    if (this.startDate !== undefined && this.endDate !== undefined) {
      if (!this.checkDates(this.startDate, new Date(this.application.startDate))
          && !this.checkDates(this.endDate, new Date(this.application.endDate))) {
        this.alertify.error('Нисте изменили ниједан датум.');
        return;
      }
      if(!this.goodOrderOfDates(this.startDate, this.endDate)) {
        this.alertify.error('Датум краја ангажовања мора бити исти или после датума почетка!');
        return;
      }
      this.application.startDate = this.startDate;
      this.application.endDate = this.endDate;
      this.application.accepted = true;
      this.applicationService.editApplication(this.project.projectID, this.application.studentID, this.application)
      .subscribe(() => {
        this.alertify.success('Успешно сте изменили ангажовање!');
        this.modalRef.hide();
      }, error => {
        this.alertify.error('Дошло је до грешке приликом измене пријаве!');
      });
    }
  }

  delete() {
    this.applicationService.delete(this.project.projectID, this.application.studentID)
      .subscribe(() => {
        this.alertify.message('Студент је одбијен за рад на пројекту.');
        this.applications.splice(this.selectedRow, 1);
        this.modalRef.hide();
      }, error => {
        this.alertify.error('Дошло је до грешке приликом одбијања студента!');
      });
  }

  /* Search criteria */
  onKey() {
    if (this.criteria !== '') {
      this.applicationService.getByCriteriaForProject(this.project.projectID, this.criteria).subscribe((res: Application[]) => {
        this.applications = res;
      }, error => {
        this.alertify.error('Дошло је до грешке приликом претраге пријава.');
      });
    } else {
      this.applicationService.getByProject(this.project.projectID).subscribe((res: Application[]) => {
        this.applications = res;
      }, error => {
        this.alertify.error('Дошло је до грешке приликом учитавања пријава.');
      });
    }
  }

  /* Selected student */
  setClickedRow(index: number) {
    this.selectedRow = index;
  }
  selected(s: Student, i: number, template: TemplateRef<any>) {
    if (s !== null) {
      this.applicationService.getById(this.project.projectID, s.studentID).subscribe( (res: Application) => {
        this.application = res;
        this.selectedRow = i;
        this.startDate = new Date(this.application?.startDate);
        this.endDate = new Date(this.application?.endDate);
        this.minDate = this.startDate;
        this.maxDate = this.endDate;
      });
      this.odabran = true;
      this.openModalWithComponent(template);
      return true;
    }
    this.odabran = false;
    return false;
  }

  /* Dates */
  goodOrderOfDates(date1: Date, date2: Date) {
    if ( date1.getFullYear() > date2.getFullYear()
        || (date1.getMonth() > date2.getMonth() && date1.getFullYear() <= date2.getFullYear())
        || (date1.getDate() > date2.getDate() &&  date1.getMonth() <= date2.getMonth() && date1.getFullYear() <= date2.getFullYear())) {
          return false;
    }
    return true;
  }
  checkDates(date1: Date, date2: Date) {
    if (date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()) {
      return false;
    }
    return true;
  }

  openModalWithComponent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}