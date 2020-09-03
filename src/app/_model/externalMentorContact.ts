import { ContactType } from './contact';

export interface ExternalMentorContact {
    externalMentorCompanyID: number;
    externalMentorMentorID: number;
    serialNumber: number;
    contactType: ContactType;
    value: string;
}
