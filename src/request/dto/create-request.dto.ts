import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {

    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    companyWebsite: string;

    @IsOptional()
    @IsString()
    fullName: string;

    @IsNotEmpty()
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

    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;
}
