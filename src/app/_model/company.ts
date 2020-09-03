import { Contact } from './contact';
import { ExternalMentor } from './externalMentor';

export interface Company {
    companyID: number;
    name: string;
    companyUsername?: string;
    contacts?: Contact[];
    mentors?: ExternalMentor[];
    locations?: Location[];
}
