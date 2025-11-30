import { inject } from '@adonisjs/core'
import { EventRepository } from '../../repository/event_repository.js'
import { CreateEventDto } from '../../dtos/event/create_event_dto.js'
import { ResponseEventDto } from '../../dtos/event/response_event_dto.js'
import NotFoundException from '#exceptions/not_found_exception'
import UnauthorizedAccessException from '#exceptions/unauthorized_access_exception'

@inject()
export class UpdateEventoUseCase {
  constructor(protected eventRepository: EventRepository) {}

  async execute(
    id: number,
    data: Partial<CreateEventDto>,
    userId: number
  ): Promise<ResponseEventDto> {
    const event = await this.eventRepository.findById(id)
    const organizerId = userId

    if (!event) {
      throw new NotFoundException('Evento não encontrado.')
    }

    if (event.organizerId !== organizerId) {
      throw new UnauthorizedAccessException(
        'Você não tem permissão para atualizar o evento de outro organizador.'
      )
    }

    event.merge(data)
    await event.save()
    return event
  }
}
