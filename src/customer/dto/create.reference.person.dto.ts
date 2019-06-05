import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReferencePersonDto{

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    position: string;
}
