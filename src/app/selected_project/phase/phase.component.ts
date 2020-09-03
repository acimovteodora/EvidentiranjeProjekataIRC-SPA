import { Component, OnInit, TemplateRef, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/_model/project';
import { Student } from 'src/app/_model/student';
import { Engagement } from 'src/app/_model/engagement';
import { Phase } from 'src/app/_model/phase';
import { Skill } from 'src/app/_model/skill';
import { EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {
  @Output() emitter: EventEmitter<Phase> = new EventEmitter<Phase>();
  @Input() students: Student[];
  @Input() phase: Phase;
  @Input() datum: Date;
  modalRef: BsModalRef;
  date = new Date();
  selectedRow: number;
  new = false;
  /* for validation */
  nameValid = true;
  phaseDescValid = true;
  startDateValid = true;
  durationValid = true;
  skillNameValid = true;
  skillDescValid = true;
  engNameValid = true;
  engDescValid =  true;

  project: Project;
  name: string;
  description: string;
  duration: number;
  startDate: Date;
  skills: Skill[] = [];
  engagements: Engagement[] = [];

  engName: string;
  engDescription: string;
  engStudent: Student;
  engPhase: Phase;
  skillName: string;
  skillDesc: string;
  notEngagedStudents: Student[] = [];

  constructor(private router: Router,
              private modalService: BsModalService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.phase !== undefined && this.phase !== null) {
      this.fill();
      this.new = false;
    } else {
      this.new = true;
      this.students.forEach(student => {
        this.notEngagedStudents.push(student);
      });
    }
  }

  fill() {
    this.name = this.phase.name;
    this.description = this.phase.description;
    this.duration = this.phase.duration;
    this.startDate = new Date(this.phase.startDate);
    if (this.phase.requiredSkills !== undefined && this.phase.requiredSkills !== null) {
      this.phase.requiredSkills.forEach(skill => {
        this.skills.push(skill);
      });
    }
    if (this.phase.engagements !== undefined && this.phase.engagements !== null) {
      this.phase.engagements.forEach(eng => {
        this.engagements.push(eng);
      });
    }
    this.setNotEngaged(this.students, this.engagements);
  }

  setNotEngaged(students: Student[], engagements: Engagement[]) {
    this.notEngagedStudents = [];
    students.forEach(student => {
      let contains = false;
      engagements.forEach(eng => {
        if (student.studentID === eng.studentID) {
          contains = true;
        }
      });
      if (!contains) {
        this.notEngagedStudents.push(student);
        console.log('usao');
      }
    });
    // console.log(this.notEngagedStudents);
  }

  openModalWithComponent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addAssignment() {
    if ( this.engName !== undefined && this.engDescription !== undefined && this.engStudent !== undefined) {
      const eng: Engagement = {
        name: this.engName,
        description: this.engDescription,
        student: this.engStudent,
        studentID: this.engStudent?.studentID
      };
      this.engagements.push(eng);
      this.setNotEngaged(this.students, this.engagements);
      console.log(this.notEngagedStudents);
      this.engName = undefined;
      this.engDescription = undefined;
      this.engStudent = undefined;
      this.selectedRow = -1;
      this.modalRef.hide();
    } else {
      this.alertify.error('Морате дефинисати назив и опис задужења, као и студента који ће га обављати!');
    }
  }

  addSkill() {
    if ( this.skillName !== undefined && this.skillDesc !== undefined) {
      const skill: Skill = {
        name: this.skillName,
        description: this.skillDesc
      };
      this.skills.push(skill);
      console.log(this.skills);
      this.skillName = undefined;
      this.skillDesc = undefined;
    } else {
      this.alertify.error('Морате унети и назив и опис вештине!');
    }
  }

  selected(s: Student, i: number) {
    if (s !== null) {
      this.engStudent = s;
      this.selectedRow = i;
      return true;
    }
    return false;
  }

  save() {
    if ( this.name !== undefined && this.description !== undefined && this.startDate !== undefined && this.duration !== undefined) {
        const phase: Phase = {
        name: this.name,
        description: this.description,
        startDate: this.startDate,
        duration: this.duration,
        engagements: this.engagements,
        requiredSkills: this.skills
      };
        this.emitter.emit(phase);
    } else {
      this.alertify.error('Морате попунити сва неопходна поља!');
    }
  }

  edit() {
    if ( this.name === this.phase.name && this.duration === this.phase.duration
      && this.description === this.phase.description && !this.checkDate(this.startDate, new Date(this.phase.startDate))
      && !this.checkEngagements(this.engagements, this.phase.engagements) && !this.checkSkills(this.skills, this.phase.requiredSkills)) {
        this.alertify.error('Нисте изменили ни један податак о одабраној фази.');
    } else {
      this.phase.name = this.name;
      this.phase.description = this.description;
      this.phase.duration = this.duration;
      this.phase.engagements = this.engagements;
      this.phase.startDate = this.startDate;
      this.phase.requiredSkills = this.skills;
      this.back();
    }
  }

  checkSkills(a1: Skill[], a2: Skill[]) {
    if ((a1 === undefined && a2 !== undefined)
          || (a1 !== undefined && a2 === undefined)
          || (a1.length !== a2.length)) {
       return true;
    }
    return false;
  }

  checkEngagements(a1: Engagement[], a2: Engagement[]) {
    if ((a1 === undefined && a2 !== undefined)
          || (a1 !== undefined && a2 === undefined)
          || (a1.length !== a2.length)) {
       return true;
    }
    return false;
  }

  checkDate(date1: Date, date2: Date) {
    if (date1.getDate() === date2.getDate() && date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()) {
      return false;
    }
    return true;
  }

  back() {
    this.phase = null;
    this.emitter.emit(undefined);
  }

  anyoneToEngage() {
    if (this.notEngagedStudents === undefined || this.notEngagedStudents === null || this.notEngagedStudents.length > 0) {
      return false;
    }
    return true;
  }

  /* Validation */
  validateName() {
    if ( this.name === undefined || this.name === '') {
      this.nameValid = false;
    } else {
      this.nameValid = true;
    }
  }
  validatePhaseDescription() {
    if ( this.description === undefined || this.description === '') {
      this.phaseDescValid = false;
    } else {
      this.phaseDescValid = true;
    }
  }

  // validateStartDate() {
  //   if ( this.startDate === undefined || this.startDate == null) {
  //     this.startDateValid = false;
  //   } else {
  //     this.startDateValid = true;
  //   }
  // }

  validateDuration() {
    if ( this.duration === undefined || this.duration < 7) {
      this.durationValid = false;
    } else {
      this.durationValid = true;
    }
  }
  
  validateSkillName() {
    if ( this.skillName === undefined || this.skillName === '') {
      this.skillNameValid = false;
    } else {
      this.skillNameValid = true;
    }
  }
  
  validateSkillDesc() {
    if ( this.skillDesc === undefined || this.skillDesc === '') {
      this.skillDescValid = false;
    } else {
      this.skillDescValid = true;
    }
  }
  
  validateEngName() {
    if ( this.engName === undefined || this.engName === '') {
      this.engNameValid = false;
    } else {
      this.engNameValid = true;
    }
  }
  
  validateEngDesc() {
    if ( this.engDescription === undefined || this.engDescription === '') {
      this.engDescValid = false;
    } else {
      this.engDescValid = true;
    }
  }
}
