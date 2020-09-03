import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApplicationService } from 'src/app/_services/application.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { Student } from 'src/app/_model/student';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Application } from 'src/app/_model/application';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StudentService } from 'src/app/_services/student.service';
import { max, min } from 'rxjs/operators';

@Component({
  selector: 'app-studentApplication',
  templateUrl: './studentApplication.component.html',
  styleUrls: ['./studentApplication.component.css']
})
export class StudentApplicationComponent implements OnInit {
  projects: Project;
  students: Student[];
  selectedStudent = -1;
  student: Student;
  project: Project;
  modalRef: BsModalRef;
  criteria = '';
  reason = '';
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  reasonValid = true;

  constructor(private applicationService: ApplicationService,
              private route: ActivatedRoute,
              private alertify: AlertifyService,
              private modalService: BsModalService,
              private studentService: StudentService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.project = data['project'];
      this.students = data['students'];
    });
    this.minDate = new Date(this.project.projectProposal.startDateProjectProposal);
    this.maxDate = new Date(this.minDate);
    this.maxDate.setDate(this.minDate.getDate() + this.project.projectProposal.daysDuration);
  }

  onKey() {
    if (this.criteria !== '') {
      this.studentService.getByCriteria(this.criteria).subscribe((res: Student[]) => {
        this.students = res;
      }, error => {
        this.alertify.error('Дошло је до грешке приликом претраге студената.');
      });
    } else {
      this.studentService.getAll().subscribe((res: Student[]) => {
        this.students = res;
      }, error => {
        this.alertify.error('Дошло је до грешке приликом учитавања студената.');
      });
    }
  }

  selectedS(s: Student, i: number) {
    if (s !== null) {
      this.student = s;
      this.selectedStudent = i;
      return true;
    }
    return false;
  }

  apply() {
    if (this.reason === '') {
      this.alertify.error('Морате унети разлог аплицирања на пројекат и изабрати студента из табеле.');
      return;
    }
    if (this.selectedStudent !== -1) {
      if(this.startDate === undefined || this.startDate === null) {
        this.startDate = new Date(this.minDate);
      }
      if(this.endDate === undefined || this.endDate === null) {
        this.endDate = new Date(this.maxDate);
      }
      const app: Application = {
        projectID: this.project.projectID,
        project: this.project,
        studentID: this.student.studentID,
        student: this.student,
        accepted: false,
        reason: this.reason,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.applicationService.insert(app).subscribe(() => {
        this.alertify.success('Успешно сачувана пријава');
      }, error => {
        this.alertify.message('Студент се већ пријавио за рад на одабраном пројекту.');
      });
    } else {
      this.alertify.error('Изаберите студента из табеле.');
    }
    this.selectedStudent = -1;
    this.student = null;
    this.startDate = undefined;
    this.endDate = undefined;
    this.reason = undefined;
  }

  setDate(date: Date){
    date = new Date(date);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.';
  }

  validateReason(){
    if(this.reason === '') {
      this.reasonValid = false;
    } else{
      this.reasonValid = true;
    }
  }
}
