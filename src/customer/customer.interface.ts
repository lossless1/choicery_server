import { ReferencePerson } from './model/reference.person';
import { ContactDetailsPerson } from './model/contact.details.person';
import { CompanyEntity } from '../company/company.entity';

export interface CustomerInterface {
    id: string;
    name: string;
    city: string;
    country: string;
    description: string;
    company: CompanyEntity;
    referencePerson: ReferencePerson;
    contactDetails: ContactDetailsPerson;
    order: number;
    crmLink: string;
    createdAt?: Date;
    updatedAt?: Date;
}
