import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    host: string;

    @IsNotEmpty()
    @IsString()
    portalUrl: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    constructor(name: string, host: string, portalUrl: string, description: string) {
        this.name = name;
        this.host = host;
        this.portalUrl = portalUrl;
        this.description = description;
    }
}
