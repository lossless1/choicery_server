import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { CompanyService } from '../company/company.service';
import { CompanyEntity } from '../company/company.entity';
import { UserRO } from '../user/dto/user.ro';


@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly companyService: CompanyService,
    ) {
    }

    async findAll(user: UserRO): Promise<any> {

        const customers = await this.customerRepository.find();
        const company = await this.companyService.findOne(user.companyId);
        const filteredCustomers = customers.filter(customer => customer.company.name === company.name);
        const filteredReversedCustomers = filteredCustomers.reverse();
        return {customers: filteredReversedCustomers, customersCount: filteredCustomers.length};
    }

    async findOne(id): Promise<CustomerEntity> {
        return await this.customerRepository.findOne(id);
    }

    async create(userId: number, customerData: CreateCustomerDto): Promise<CustomerEntity> {

        const _company: CompanyEntity = await this.companyService.findOne(customerData.companyId);
        const errors = {company: ' with this id not found'};
        if (!_company) throw new HttpException({errors}, 401);

        let customer = new CustomerEntity();
        customer.name = customerData.name;
        customer.city = customerData.city;
        customer.country = customerData.country;
        customer.description = customerData.description;

        customer.company = _company;

        //TODO Get reference person
        customer.referencePerson = {
            fullname: customerData.referencePerson.fullname,
            email: customerData.referencePerson.email,
            phone: customerData.referencePerson.phone,
            position: customerData.referencePerson.position,
            image: '',
        };

        customer.contactDetails = customerData.contactDetails;
        customer.order = 0;

        return await this.customerRepository.save(customer);
    }

    async update(id: string, customerData: any): Promise<any> {
        let toUpdate = await this.customerRepository.findOne({id});
        let updated = Object.assign(toUpdate, customerData);
        return await this.customerRepository.save(updated);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.customerRepository.delete({id});
    }
}
