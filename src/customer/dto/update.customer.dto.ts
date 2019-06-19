import { IsMongoId, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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
    description: string;

    @IsNotEmpty()
    @IsMongoId()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    crmLink: string;

    @IsNotEmpty()
    @IsString()
    note: string;

    @ValidateNested()
    @Type(() => CreateReferencePersonDto)
    referencePerson: CreateReferencePersonDto;

    @ValidateNested()
    @Type(() => CreateContactDetailsDto)
    contactDetails: CreateContactDetailsDto;
}
