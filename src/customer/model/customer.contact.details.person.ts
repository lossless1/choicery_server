import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerContactDetailsPerson{

    @Column()
    phone: string;

    @Column()
    facebook: string;

    @Column()
    linkedin: string;

    @Column()
    twitter: string;
}
