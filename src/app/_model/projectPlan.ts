import { Phase } from './phase';
import { Dokument } from './dokument';

export interface ProjectPlan extends Dokument {
    duration: number;
    estimatedStartDate: Date;
    phases: Phase[];
}
