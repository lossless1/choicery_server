import { Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class CustomerReferencePerson{
    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    image: string;

    @Column()
    phone: string;

    @Column()
    position: string;
}
