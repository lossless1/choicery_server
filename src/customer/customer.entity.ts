import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { ReferencePerson } from './model/reference.person';
import { ContactDetailsPerson } from './model/contact.details.person';
import { Type } from 'class-transformer';

@Entity()
export class CustomerEntity {

    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    description: string;

    @Column(type => CompanyEntity)
    company: CompanyEntity;

    @Column(type => ReferencePerson)
    referencePerson: ReferencePerson;

    @Column(type => ContactDetailsPerson)
    contactDetails: ContactDetailsPerson;

    @Column()
    order: number;

    @Column()
    crmLink: string;

    @Type(() => Date)
    createdAt: number;

    @Type(() => Date)
    updatedAt: number;

    @BeforeInsert()
    updateDateCreation() {
        this.createdAt = Date.now();
    }

    @BeforeUpdate()
    updateDateUpdate() {
        this.updatedAt = Date.now();
    }
}
