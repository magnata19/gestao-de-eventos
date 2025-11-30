import { inject } from '@adonisjs/core'
import UserRepository from '../../repository/user_repository.js'
import { EventRepository } from '../../repository/event_repository.js'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export default class DeleteEventSubscriptionUseCase {
  constructor(
    protected userRepository: UserRepository,
    protected eventRepository: EventRepository
  ) {}
  async execute(userId: number, eventId: number): Promise<any> {
    const user = await this.userRepository.findById(userId)
    const event = await this.eventRepository.findById(eventId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.')
    }
    if (!event) {
      throw new NotFoundException('Evento não encontrado.')
    }

    const isRegistered = await event
      .related('participants')
      .query()
      .where('user_id', userId)
      .first()

    if (!isRegistered) {
      throw new NotFoundException('Inscrição no evento não encontrada para este usuário.')
    }
    await event.related('participants').detach([userId])
    return {
      message: 'Inscrição no evento cancelada com sucesso.',
    }
  }
}
