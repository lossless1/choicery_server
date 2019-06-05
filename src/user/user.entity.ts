import { Entity, Column, BeforeInsert, ObjectIdColumn, ObjectID, BeforeUpdate } from "typeorm";
import { IsEmail} from 'class-validator';
import * as crypto from 'crypto';
import { Type } from 'class-transformer';

@Entity('users')
export class UserEntity {

  @ObjectIdColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
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
