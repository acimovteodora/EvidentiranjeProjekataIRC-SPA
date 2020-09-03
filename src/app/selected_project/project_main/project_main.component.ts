import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ApplicationService } from 'src/app/_services/application.service';
import { Application } from 'src/app/_model/application';

@Component({
  selector: 'app-project_main',
  templateUrl: './project_main.component.html',
  styleUrls: ['./project_main.component.css']
})
export class Project_mainComponent implements OnInit {
  project: Project;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private alertify: AlertifyService,
              private appService: ApplicationService) { }

  ngOnInit() {
    this.route.data.subscribe( data =>{
      this.project = data['project'];
    });
  }

  applications() {
    this.appService.getByProject(this.project.projectID).subscribe( (res: Application[]) => {
      if (res === null || res.length === 0) {
        this.alertify.message('За рад на пројекту се није пријавио ни један студент.');
        this.router.navigate(['/projects/', this.project.projectID]);
      } else {
        this.router.navigate(['/projects/', this.project.projectID, 'applications']);
      }
    });
  }
  projectPlan() {
    this.router.navigate(['/projects/', this.project.projectID, 'projectplan']);
  }
  back() {
    this.router.navigate(['/projects']);
  }
}
