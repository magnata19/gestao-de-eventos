import { inject } from '@adonisjs/core'
import NotFoundException from '#exceptions/not_found_exception'
import UnauthorizedAccessException from '#exceptions/unauthorized_access_exception'
import { EventRepository } from '../../repository/event_repository.js'

@inject()
export default class ShowParticipantsFromEventUseCase {
  constructor(protected eventRepository: EventRepository) {}

  async execute(organizerId: number, eventId: number): Promise<any> {
    const event = await this.eventRepository.findById(eventId)
    if (!event) {
      throw new NotFoundException('Evento não encontrado.')
    }

    if (event.organizerId !== organizerId) {
      throw new UnauthorizedAccessException(
        'Você não tem permissão para ver os participantes deste evento.'
      )
    }

    await event.load('participants', (query) => {
      query.select('id', 'name', 'email')
      query.orderBy('name', 'asc')
    })

    return { event }
  }
}
