import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import CreateEventUseCase from '../../use_case/event/create_event_use_case.js'
import { EventValidator } from '#validators/event/event'
import { DateTime } from 'luxon'
import { ResponseEventDto } from '../../dtos/event/response_event_dto.js'
import { UpdateEventoUseCase } from '../../use_case/event/update_event_use_case.js'

@inject()
export default class EventsController {
  constructor(
    protected createEventUseCase: CreateEventUseCase,
    protected updateEventUseCase: UpdateEventoUseCase
  ) {}

  async create({ auth, request, response }: HttpContext): Promise<ResponseEventDto> {
    const user = auth.user
    const data = await request.validateUsing(EventValidator)
    const event = await this.createEventUseCase.create({
      ...data,
      dateTime: DateTime.fromFormat(data.dateTime, 'dd/MM/yyyy HH:mm'), // converte string para DateTime do Luxon
      organizerId: user!.id,
    })
    response.status(201)
    return event
  }

  async update({ auth, request, response, params }: HttpContext): Promise<ResponseEventDto> {
    const data = await request.validateUsing(EventValidator)
    const eventId = params.id
    const userId = auth.user?.id!
    const event = await this.updateEventUseCase.update(
      eventId,
      {
        ...data,
        dateTime: DateTime.fromFormat(data.dateTime, 'dd/MM/yyyy HH:mm'), // converte string para DateTime do Luxon
      },
      userId
    )
    response.status(200)
    return event
  }
}
