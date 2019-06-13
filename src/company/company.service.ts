import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
    ) {
    }

    async findAll(user): Promise<any> {
        const companies = await this.companyRepository.find();
        const company = await this.findOne(user.companyId);
        const filteredCustomers = company.filter(customer => customer.company.name === company.name);
        const filteredReversedCompanies = filteredCustomers.reverse();

        return {filteredReversedCompanies, companiesCount: companies.length};
    }

    async findOne(id): Promise<any> {
        return await this.companyRepository.findOne(id);
    }

    async create(companyData: CreateCompanyDto): Promise<CompanyEntity> {
        const company = new CompanyEntity();
        company.name = companyData.name;
        company.host = companyData.host || CompanyEntity.createHostCompany(companyData.name);
        company.portalUrl = companyData.portalUrl || CompanyEntity.createPortalUrlCompany(companyData.name);
        company.description = companyData.description || ``;
        try {
            await this.companyRepository.save(company);
            return company;
        } catch (e) {
            throw new HttpException({company: "not saved in DB"}, 500);
        }
    }

    async update(id: string, companyData: any): Promise<any> {
        let toUpdate = await this.companyRepository.findOne(id);
        let updated = Object.assign(toUpdate, companyData);
        try {
            await this.companyRepository.save(updated);
            return updated;
        } catch (e) {
            throw new HttpException({company: "not updated in DB"}, 500);
        }
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.companyRepository.delete(id);
    }

}
