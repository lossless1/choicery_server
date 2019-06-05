import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(): Promise<any> {
    const companies = await this.companyRepository.find();
    return {companies, companiesCount: companies.length};
  }

  async findOne(id): Promise<any> {
    return await this.companyRepository.findOne(id);
  }

  async create(companyData: CreateCompanyDto): Promise<CompanyEntity> {

    let company = new CompanyEntity();
    company.name = companyData.name;
    company.host = companyData.host;
    company.portalUrl = companyData.portalUrl;
    company.description = companyData.description;
    return await this.companyRepository.save(company);
  }

  async update(id: string, companyData: any): Promise<any> {
    let toUpdate = await this.companyRepository.findOne(id);
    let updated = Object.assign(toUpdate, companyData);
    return await this.companyRepository.save(updated);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.companyRepository.delete(id);
  }

}
