import { IsOptional, IsString } from 'class-validator';

export class CreateContactDetailsDto {

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    facebook: string;

    @IsOptional()
    @IsString()
    linkedin: string;

    @IsOptional()
    @IsString()
    twitter: string;
}
