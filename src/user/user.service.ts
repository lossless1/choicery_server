import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

import * as jwt from 'jsonwebtoken';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserRO } from './dto/user.ro';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService,
    ) {
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const findOneOptions = {
            email: loginUserDto.email,
            password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
        };

        return await this.userRepository.findOne(findOneOptions);
    }


    async create(dto: CreateUserDto): Promise<UserRO> {

        // check uniqueness of username/email
        const {email, password, fullName, position, username, companyId} = dto;
        const user = await this.findOne(new LoginUserDto(email, password));
        if (user) {
            const errors = {username: 'Username and email must be unique.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        // create new user
        let newUser = new UserEntity();
        newUser.email = email;
        newUser.password = password;
        newUser.position = position || UserEntity.getUsernameFromEmail(email);
        newUser.username = username || UserEntity.getInitialPosition();
        newUser.fullName = fullName;
        newUser.companyId = companyId;

        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserRO(savedUser);
    }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
        let toUpdate = await this.userRepository.findOne(id);
        let updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }

    async delete(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({email: email});
    }

    async findById(id: number): Promise<UserRO> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            const errors = {error: 'User not found'};
            throw new HttpException({errors}, 403);
        }

        return this.buildUserRO(user);
    }

    async findByEmail(email: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({email});
        return this.buildUserRO(user);
    }

    public generateJWT(user: UserEntity) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, this.configService.get('SECRET'));
    };

    private buildUserRO(user: UserEntity) {
        return {
            username: user.username,
            email: user.email,
            token: this.generateJWT(user),
            fullName: user.fullName,
            position: user.position,
            companyId: user.companyId,
        };
    }
}
