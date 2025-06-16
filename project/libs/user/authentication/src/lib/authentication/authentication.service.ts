import dayjs from 'dayjs';
import { ConflictException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '@project/user-config';

import { UserEntity, UserRepository } from '@project/readme-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthenticationUserStatus } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangeUserPasswordDto } from '../dto/change-user-password.dto';

export class AuthenticationService {
    constructor (
        private readonly userRepository : UserRepository, 

        @Inject(dbConfig.KEY)
        private readonly databaseConfig : ConfigType<typeof dbConfig>)
        {
        }

    public async register(dto: CreateUserDto) : Promise<UserEntity> {
        const {email, fullName, password, dateOfBirth, profileImage} = dto;

        const newUser = {
            email, fullName, profileImage, dateOfBirth: dayjs(dateOfBirth).toDate(), passwordHash: '',
        }
        const existUser = await this.userRepository.findByEmail(email);

        if (existUser) {
            throw new ConflictException(AuthenticationUserStatus.UserExist);
        }

        const userEntity = await new UserEntity(newUser).setPassword(password);

        this.userRepository.save(userEntity);

        return userEntity;
    }

    public async verifyUser(dto: LoginUserDto) {
        const {email, password} = dto;
        
        const user = await this.userRepository.findByEmail(email);

        if (! user) {
            throw new ConflictException(AuthenticationUserStatus.UserNotFound);
        }

        if (! await user.comparePassword(password)) {
            throw new ConflictException(AuthenticationUserStatus.IncorrectPassword);
        }

        return user;

    }

    public async getUser(id: string) {
        
        const user = await this.userRepository.findById(id);

        if(! user) {
            throw new ConflictException(AuthenticationUserStatus.UserNotFound);
        }

        return user;

    }

    public async changeUserPassword(dto: ChangeUserPasswordDto) {
        const {email, password, newPassword} = dto;
        
        const user = await this.userRepository.findByEmail(email);

        if (! user) {
            throw new ConflictException(AuthenticationUserStatus.UserNotFound);
        }

        if (! await user.comparePassword(password)) {
            throw new ConflictException (AuthenticationUserStatus.IncorrectPassword);
        }

        user.setPassword(newPassword);

        return user;
    }
}