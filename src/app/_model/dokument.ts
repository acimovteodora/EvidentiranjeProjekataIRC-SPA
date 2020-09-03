import { NumberSymbol } from '@angular/common';
import { Employee } from './employee';

export interface Dokument {
    projectID?: number;
    documentID?: number;
    title: string;
    dateOfCompilation: Date;
    note: string;
    composedBy?: Employee;
}
