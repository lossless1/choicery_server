import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateReferencePersonDto } from './create.reference.person.dto';
import { Type } from 'class-transformer';
import { CreateContactDetailsDto } from './create.contact.details.dto';

export class CreateCustomerDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    note: string;

    @IsNotEmpty()
    @IsMongoId()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    crmLink: string;

    @IsOptional()
    @IsString()
    companyLogo: string;

    @IsNotEmpty()
    @IsString()
    referencePersonFullName:string;

    @IsNotEmpty()
    @IsString()
    referencePersonEmail:string;

    @IsOptional()
    @IsString()
    referencePersonPhone:string;

    @IsOptional()
    @IsString()
    referencePersonPhoto:string;

    @IsOptional()
    @IsString()
    referencePersonPosition:string;

    @IsNotEmpty()
    @IsString()
    contactDetails: string;
}
