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

    @IsOptional()
    @IsString()
    textarea: string;

    constructor(textarea?: string, phone?: string, facebook?: string, linkedin?: string, twitter?: string) {
        this.textarea = textarea;
        this.phone = phone;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.twitter = twitter;
    }

}
