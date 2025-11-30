import { inject } from '@adonisjs/core'
import UserRepository from '../../repository/user_repository.js'
import NotFoundException from '#exceptions/not_found_exception'
import { EventRepository } from '../../repository/event_repository.js'
import User from '#models/user'
import Event from '#models/event'
import EventAlreadyRegistered from '#exceptions/event_already_registered'
import { checkCapacityAndRegister } from '../../utils/functions/event/check_capacity_and_register.js'

@inject()
export class RegisterEventUseCase {
  constructor(
    protected userRepository: UserRepository,
    protected eventRepository: EventRepository
  ) {}

  async execute(userId: number, eventId: number) {
    const [user, event] = await Promise.all([
      User.find(userId),
      Event.query().where('id', eventId).first(),
    ])
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.')
    }
    if (!event) {
      throw new NotFoundException('Evento não encontrado.')
    }

    //nao pode se inscrever duas vezes no mesmo evento
    const alreadyRegistered = await event
      .related('participants')
      .query()
      .where('user_id', userId)
      .first()

    if (alreadyRegistered) {
      throw new EventAlreadyRegistered('Você já está inscrito neste evento.')
    }

    const conflictingEvent = await Event.query()
      .where('date_time', event.dateTime.toSQL()!) // mesmo horário
      .where('id', '!=', event.id) // não é o mesmo evento
      .whereHas('participants', (q) => {
        q.where('user_id', userId) // usuário inscrito nele
      })
      .first()

    if (conflictingEvent) {
      throw new EventAlreadyRegistered(
        'Você já está inscrito em outro evento que ocorre no mesmo horário.'
      )
    }

    await checkCapacityAndRegister(event, userId)
    return {
      message: 'Inscrição realizada com sucesso no evento.',
      event: {
        id: event.id,
        name: event.name,
        dateTime: event.dateTime,
        maximumCapacity: event.maximumCapacity,
      },
    }
  }
}
