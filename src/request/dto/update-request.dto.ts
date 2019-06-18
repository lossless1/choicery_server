import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from '../../company/dto';
import { CreateCustomerDto } from '../../customer/dto/create.customer.dto';
import { RequestStatusEnum } from '../../enums/request.status.enum';

export class UpdateRequestDto{

    @IsOptional()
    @IsString()
    companyName: string;

    @IsOptional()
    @IsString()
    companyWebsite: string;

    @IsOptional()
    @IsString()
    fullName: string;

    @IsOptional()
    @IsString()
    position: string;

    @IsOptional()
    @IsString()
    contacts: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    note: string;
}
