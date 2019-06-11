import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from '../../company/dto';
import { CreateCustomerDto } from '../../customer/dto/create.customer.dto';
import { RequestStatusEnum } from '../../enums/request.status.enum';

export class UpdateRequestDto{
    @IsOptional()
    @IsString()
    fullName: string;

    @IsOptional()
    @ValidateNested()
    @Type(type => CreateCompanyDto)
    prospectCompany: CreateCompanyDto;

    @IsOptional()
    @IsEnum(RequestStatusEnum)
    status: RequestStatusEnum;

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
