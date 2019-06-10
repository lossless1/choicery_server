import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {

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
    customerId: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;
}
