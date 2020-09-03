import { ExternalMentor } from './externalMentor';
import { Company } from './company';
import { ProjectCoveringSubject } from './projectCoveringSubject';

export interface ProjectProposal {
    projectProposalID: number;
    proposalDate: Date;
    name: string;
    goal: string;
    description: string;
    activities: string;
    startDateProjectProposal: Date;
    daysDuration: number;
    externalMentor: ExternalMentor;
    company: Company;
    subjects: ProjectCoveringSubject[];
}
