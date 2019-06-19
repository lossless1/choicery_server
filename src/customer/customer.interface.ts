import { ReferencePerson } from './model/reference.person';
import { ContactDetailsPerson } from './model/contact.details.person';
import { CompanyEntity } from '../company/company.entity';
import { ObjectID } from 'mongodb';

export interface CustomerInterface {
    id: ObjectID;
    name: string;
    city: string;
    country: string;
    description: string;
    company: CompanyEntity;
    referencePerson: ReferencePerson;
    contactDetails: ContactDetailsPerson;
    order: number;
    crmLink: string;
    note: string;
    createdAt?: Date;
    updatedAt?: Date;
}
