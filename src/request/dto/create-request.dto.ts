import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {

    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    companyWebsite: string;

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsString()
    contacts: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;
}
