/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Project_mainComponent } from './project_main.component';

describe('Project_mainComponent', () => {
  let component: Project_mainComponent;
  let fixture: ComponentFixture<Project_mainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Project_mainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Project_mainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
