import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';
import { RequestStatusEnum } from '../enums/request.status.enum';
import { ContactDetailsPerson } from '../customer/model/contact.details.person';

export interface RequestInterface {
  id: string;
  fullName: string;
  position: string;
  prospectCompany: CompanyEntity;
  customer: CustomerEntity;
  company: CompanyEntity;
  requestState: string;
  status: RequestStatusEnum;
  contactDetails: ContactDetailsPerson;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}
