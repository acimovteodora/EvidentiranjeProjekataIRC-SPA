import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_model/project';
import { Observable } from 'rxjs';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(private projectsService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data['projects'];
    });
    if(this.projects == null){
      this.alertify.error('Не постоји ни један пројекат!');
    }
  }
}
