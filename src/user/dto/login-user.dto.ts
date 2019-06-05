import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly companyId: string;

    constructor(email: string, password: string, companyId: string) {
        this.email = email;
        this.password = password;
        this.companyId = companyId;
    }
}
