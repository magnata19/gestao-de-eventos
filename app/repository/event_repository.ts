import { CreateEventDto } from '../dtos/event/create_event_dto.js'
import Event from '#models/event'

export class EventRepository {
  async create(data: CreateEventDto): Promise<Event> {
    return await Event.create(data)
  }
}
