import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '../../company/dto';
import { Type } from 'class-transformer';

export class CreateRequestDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @ValidateNested()
    @Type(() => CreateCompanyDto)
    prospectCompany: CreateCompanyDto;

    @IsNotEmpty()
    @IsString()
    contacts: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    website: string;

    @IsNotEmpty()
    customerId: string;

    @IsNotEmpty()
    companyId: string;
}
