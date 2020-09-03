import { Student } from './student';
import { Project } from './project';

export interface Application {
    studentID: number;
    student: Student;
    projectID: number;
    project?: Project;
    startDate?: Date;
    endDate?: Date;
    experienceInPreviousProjects?: boolean;
    accepted?: boolean;
    reason: string;
}
