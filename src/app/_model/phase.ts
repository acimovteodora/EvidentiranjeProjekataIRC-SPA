import { ProjectPlan } from './projectPlan';
import { Engagement } from './engagement';
import { Skill } from './skill';

export interface Phase {
    projectID?: number;
    documentID?: number;
    projectPlan?: ProjectPlan;
    phaseID?: number;
    name: string;
    description: string;
    duration: number;
    startDate: Date;
    engagements: Engagement[];
    requiredSkills: Skill[];
}
