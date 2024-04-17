import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsersService() {
    return this.userRepository.find();
  }

  async createUserService(params: CreateUserDto): Promise<User> {
    return this.userRepository.save(params);
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUserSevice(id: string, params: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return this.userRepository.save({ ...user, ...params });
  }

  async deleteUserService(id: string): Promise<User> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return this.userRepository.remove(user);
  }
}
