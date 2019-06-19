import {
    Entity,
    Column,
    ObjectIdColumn,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { ReferencePerson } from './model/reference.person';
import { ContactDetailsPerson } from './model/contact.details.person';
import { ObjectID } from 'mongodb';

@Entity()
export class CustomerEntity {

    @ObjectIdColumn()
    id: ObjectID;

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

    @Column()
    contactDetails: string;

    @Column()
    order: number;

    @Column()
    crmLink: string;

    @Column()
    note: string;

    @Column()
    logoUrl: string;

    @Column()
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @Column({nullable: true})
    @UpdateDateColumn({type: 'timestamp', nullable: true})
    updatedAt?: Date;
}
