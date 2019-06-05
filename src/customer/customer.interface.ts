import { CustomerReferencePerson } from './model/customer.reference.person';
import { CompanyInterface } from '../company/company.interface';
import { CustomerContactDetailsPerson } from './model/customer.contact.details.person';
import { Company } from '../../../client/src/app/core/models';

export interface CustomerInterface {
    id: string;
    name: string;
    city: string;
    country: string;
    description: string;
    company: Company;
    referencePerson: CustomerReferencePerson;
    contactDetails: CustomerContactDetailsPerson;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}
