import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {


    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly username: string;

    @IsOptional()
    @IsString()
    readonly position: string;

    @IsNotEmpty()
    @IsString()
    readonly companyId: string;
}
