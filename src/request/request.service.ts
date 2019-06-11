import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, ObjectID } from 'typeorm';
import { RequestEntity } from './request.entity';
import { UserEntity } from '../user/user.entity';
import { CustomerService } from '../customer/customer.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserRO } from '../user/dto/user.ro';
import { CompanyService } from '../company/company.service';
import { CreateCompanyDto } from '../company/dto';
import { CustomerEntity } from '../customer/customer.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateContactDetailsDto } from '../customer/dto/create.contact.details.dto';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly requestRepository: Repository<RequestEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly customerService: CustomerService,
        private readonly companyService: CompanyService,
    ) {
    }

    async findAll(user: UserRO): Promise<any> {
        const requests = await this.requestRepository.find();

        const _company: CustomerEntity = await this.customerService.findOne(user.companyId);
        if (!_company) throw new HttpException({customer: "with this id is not exist"}, 401);

        const filteredRequests = requests.filter(request => request.company.name === _company.name);
        const filteredReversedRequests = filteredRequests.reverse();
        return {requests: filteredReversedRequests, requestsCount: filteredRequests.length};
    }

    async findOne(id): Promise<RequestEntity> {
        return await this.requestRepository.findOne(id);
    }

    async create(user: UserRO, requestData: CreateRequestDto): Promise<RequestEntity> {

        let request = new RequestEntity();
        request.fullName = requestData.fullName;
        request.prospectCompany = await this.companyService.create(
            new CreateCompanyDto(requestData.companyName, '', requestData.companyWebsite, requestData.description));
        request.status = '';

        const _customer: CustomerEntity = await this.customerService.findOne(requestData.customerId);
        if (!_customer) throw new HttpException({customer: "with this id is not exist"}, 401);

        request.customer = _customer;

        const _company = await this.companyService.findOne(requestData.companyId);
        if (!_company) throw new HttpException({company: "with this id is not exist"}, 401);
        request.contactDetails = new CreateContactDetailsDto(requestData.contacts);
        request.company = _company;
        request.requestState = '';

        return await this.requestRepository.save(request);

    }

    async update(id: string, requestsData: UpdateRequestDto): Promise<RequestEntity> {
        const _request: RequestEntity = await this.findOne(id);
        if (!_request) throw new HttpException({request: "with this id is not exist"}, 401);
        const updated: RequestEntity = Object.assign(_request, requestsData);
        await this.requestRepository.update({id: _request.id}, updated);
        return updated;
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.requestRepository.delete(id);
    }
}
