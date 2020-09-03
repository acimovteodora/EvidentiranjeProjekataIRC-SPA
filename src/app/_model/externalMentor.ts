import { ExternalMentorContact } from './externalMentorContact';

export interface ExternalMentor {
    mentorID: number;
    companyID: number;
    name: string;
    surname: string;
    contacts: ExternalMentorContact[];
}
