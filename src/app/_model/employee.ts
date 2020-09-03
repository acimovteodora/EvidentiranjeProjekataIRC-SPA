import { EmployeePosition } from './employeePosition';

export interface Employee {
    employeeID: number;
    name: string;
    surname: string;
    username?: string;
    positions?: EmployeePosition[];
}
