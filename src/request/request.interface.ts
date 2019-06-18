import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';
import { RequestStatusEnum } from '../enums/request.status.enum';

export interface RequestInterface {
  id: string;
  fullName: string;
  position: string;
  prospectCompany: CompanyEntity;
  customer: CustomerEntity;
  company: CompanyEntity;
  requestState: string;
  status: RequestStatusEnum;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}
