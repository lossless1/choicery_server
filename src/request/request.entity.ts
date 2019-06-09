import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';
import { Type } from 'class-transformer';
import { ContactDetailsPerson } from '../customer/model/contact.details.person';

@Entity('requests')
export class RequestEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    fullName: string;

    @Column(type => CompanyEntity)
    prospectCompany: CompanyEntity;

    @Column()
    status: string;

    @Column(type => CustomerEntity)
    customer: CustomerEntity;

    @Column(type => CompanyEntity)
    company: CompanyEntity;

    @Column(type => ContactDetailsPerson)
    contactDetails: ContactDetailsPerson;

    @Column()
    requestState: string;

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
