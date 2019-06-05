import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    companyDetails: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    requestState: string;
}
