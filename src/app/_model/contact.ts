export interface Contact {
    companyID: number;
    contactID: number;
    contactType: ContactType;
    value: string;
}

export enum ContactType {
    Telephone = 'Telephone',
    Email = 'Email',
    LinkedIn = 'LinkedIn'
  }
