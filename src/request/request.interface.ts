import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';

export interface RequestInterface {
  id: string;
  fullName: string;
  companyName: string;
  companyDetails: string;
  prospectCompany: CompanyEntity;
  email: string;
  status: string;
  customer: CustomerEntity;
  requestState: string;
  createdAt?: number;
  updatedAt?: number;
}
