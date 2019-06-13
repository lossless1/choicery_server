import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Type } from 'class-transformer';

@Entity()
export class CompanyEntity {

    @ObjectIdColumn()
    id: string;

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

    static createHostCompany(name) {
        return `http://www.${name.toLowerCase()}.choicery.com`;
    }

    static createPortalUrlCompany(name) {
        return `http://www.${name.toLowerCase()}.com`;
    }
}
