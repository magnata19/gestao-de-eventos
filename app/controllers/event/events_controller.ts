import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import CreateEventUseCase from '../../use_case/event/create_event_use_case.js'
import { EventValidator } from '#validators/event/event'
import { DateTime } from 'luxon'
import { ResponseEventDto } from '../../dtos/event/response_event_dto.js'
import { UpdateEventoUseCase } from '../../use_case/event/update_event_use_case.js'
import { RegisterEventUseCase } from '../../use_case/user/register_event_use_case.js'

@inject()
export default class EventsController {
  constructor(
    protected createEventUseCase: CreateEventUseCase,
    protected updateEventUseCase: UpdateEventoUseCase,
    protected subscribeEventUseCase: RegisterEventUseCase
  ) {}

  async create({ auth, request, response }: HttpContext): Promise<ResponseEventDto> {
    const user = auth.user
    const data = await request.validateUsing(EventValidator)
    const event = await this.createEventUseCase.execute({
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
    const event = await this.updateEventUseCase.execute(
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

  async eventSubscribe({ params, auth, request, response }: HttpContext): Promise<any> {
    const userId = auth.user!.id
    const eventId = params.id
    const result = await this.subscribeEventUseCase.execute(userId, eventId)
    response.status(200)
    return result
  }
}
