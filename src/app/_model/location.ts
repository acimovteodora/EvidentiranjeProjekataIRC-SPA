import { Company } from './company';
import { City } from './city';

export interface Location {
    companyID: number;
    company: Company;
    cityID: number;
    city: City;
    streetName: string;
    streetNumber: string;
    floor: string;
    appartmentNumber: string;
}
