import { inject } from '@adonisjs/core'
import UserRepository from '../../repository/user_repository.js'
import User from '#models/user'
import { UserCreateDto } from '../../dtos/user/create_user_dto.js'

@inject()
export class CreateUserUseCase {
  constructor(protected userRepository: UserRepository) {}

  async execute(data: UserCreateDto): Promise<User> {
    return await this.userRepository.create(data)
  }
}
