import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    host: string;

    @IsOptional()
    @IsString()
    portalUrl: string;

    @IsOptional()
    @IsString()
    description: string;

    constructor(name: string, host: string, portalUrl: string, description: string) {
        this.name = name;
        this.host = host;
        this.portalUrl = portalUrl;
        this.description = description;
    }
}
