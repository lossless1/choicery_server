import {
  Entity,
  Column,
  BeforeInsert,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import * as crypto from 'crypto';
import { ObjectId} from 'mongodb';

@Entity('users')
export class UserEntity {

  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @Column()
  password: string;

  @Column()
  companyId: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  static getUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  static getInitialPosition() {
    return 'Admin';
  }

}
