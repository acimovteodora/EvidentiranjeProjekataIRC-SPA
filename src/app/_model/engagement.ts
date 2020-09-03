import { Student } from './student';
import { Phase } from './phase';

export interface Engagement {
    studentID: number;
    student: Student;
    projectID?: number;
    documentID?: number;
    phaseID?: number;
    phase?: Phase;
    name: string;
    description: string;
}
