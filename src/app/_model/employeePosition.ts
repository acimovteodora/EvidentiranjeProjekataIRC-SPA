import { Employee } from './employee';

export interface EmployeePosition {
    employeeID: number;
    employee: Employee;
    postionID: number;
    position: Position;
    dateFrom: Date;
    dateTo?: Date;
}
