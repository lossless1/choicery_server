import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';

export interface RequestInterface {
  id: string;
  fullName: string;
  position: string;
  prospectCompany: CompanyEntity;
  status: string;
  customer: CustomerEntity;
  company: CompanyEntity;
  requestState: string;
  createdAt?: Date;
  updatedAt?: Date;
}
