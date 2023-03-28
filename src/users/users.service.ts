import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/auth/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async find() {
    return this.userRepository.find();
  }

  async findOneBy(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async update(uesr: User, updateUserDto: UpdateUserDto) {
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: uesr.id })
      .execute();
  }
}
