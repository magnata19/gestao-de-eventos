import { inject } from '@adonisjs/core'
import { EventRepository } from '../../repository/event_repository.js'
import { CreateEventDto } from '../../dtos/event/create_event_dto.js'
import { ResponseEventDto } from '../../dtos/event/response_event_dto.js'

@inject()
export default class CreateEventUseCase {
  constructor(protected eventRepository: EventRepository) {}

  async execute(data: CreateEventDto): Promise<ResponseEventDto> {
    const event = await this.eventRepository.create(data)
    return event
  }
}
