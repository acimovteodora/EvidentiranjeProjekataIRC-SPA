import { Employee } from './employee';
import { ProjectProposal } from './projectProposal';
import { Application } from './application';

export interface Project {
    projectID: number;
    adoptionDate: Date;
    description: string;
    note: string;
    internalMentor: Employee;
    decisionMaker: Employee;
    projectProposal: ProjectProposal;
    documents: Document[];
    applications: Application[];
}
