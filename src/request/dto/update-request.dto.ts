import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from '../../company/dto';
import { CreateCustomerDto } from '../../customer/dto/create.customer.dto';

export class UpdateRequestDto{
    @IsOptional()
    @IsString()
    fullName: string;

    @IsOptional()
    @ValidateNested()
    @Type(type => CreateCompanyDto)
    prospectCompany: CreateCompanyDto;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @ValidateNested()
    @Type(type => CreateCustomerDto)
    customer: CreateCustomerDto;

    @IsOptional()
    @ValidateNested()
    @Type(type => CreateCompanyDto)
    company: CreateCompanyDto;

    @IsOptional()
    @IsString()
    requestState: string;
}
