import { inject } from '@adonisjs/core'
import UserRepository from '../../repository/user_repository.js'
import { UpdateUserDto } from '../../dtos/user/update_user_dto.js'
import User from '#models/user'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export class UpdateUserUseCase {
  constructor(protected userRepository: UserRepository) {}

  async execute(id: number, data: Partial<UpdateUserDto>): Promise<User | null> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.')
    }
    user.merge(data)
    await user.save()
    return user
  }
}
