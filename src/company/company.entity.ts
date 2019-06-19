import {
    Entity,
    Column,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class CompanyEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    host: string;

    @Column()
    image: string;

    @Column()
    portalUrl: string;

    @Column()
    description: string;

    @Column()
    logoUrl: string;

    @Column()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({ nullable: true })
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;

    static createHostCompany(name) {
        return `http://www.${name.toLowerCase()}.choicery.com`;
    }

    static createPortalUrlCompany(name) {
        return `http://www.${name.toLowerCase()}.com`;
    }
}
