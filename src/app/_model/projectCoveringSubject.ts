import { ScientificArea } from './scientificArea';

export interface ProjectCoveringSubject {
    projectCoveringSubjectID: number;
    projectProposalID: number;
    name: string;
    description: string;
    scientificArea: ScientificArea;
}
