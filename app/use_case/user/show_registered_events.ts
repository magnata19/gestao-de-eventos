import { inject } from '@adonisjs/core'
import UserRepository from '../../repository/user_repository.js'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export class ShowRegisteredEventsUseCase {
  constructor(protected userRepository: UserRepository) {}
  async execute(userId: number) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.')
    }
    await user.load('registeredEvents', (builder) => {
      builder.preload('organizer').orderBy('date_time', 'asc')
    })
    return user.registeredEvents
  }
}
