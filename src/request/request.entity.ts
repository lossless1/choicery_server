import {
    Entity,
    Column,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';
import { ContactDetailsPerson } from '../customer/model/contact.details.person';
import { ObjectID } from 'mongodb';

@Entity('requests')
export class RequestEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    fullName: string;

    @Column()
    position: string;

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

    @Column()
    note: string;

    @Column()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({ nullable: true })
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
}
