import { Phase } from './phase';

export interface Skill {
    projectID?: number;
    documentID?: number;
    phaseID?: number;
    phase?: Phase;
    skillID?: number;
    name: string;
    description: string;
}
