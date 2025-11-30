import { inject } from '@adonisjs/core'
import Event from '#models/event'
import UnauthorizedAccessException from '#exceptions/unauthorized_access_exception'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export default class DeleteOnlyEmptyEventsUseCase {
  constructor() {}

  async execute(userId: number, eventId: number): Promise<any> {
    const event = await Event.query().where('id', eventId).where('organizer_id', userId).first()
    if (event?.organizerId !== userId) {
      throw new UnauthorizedAccessException('Você não tem permissão para deletar este evento.')
    }

    if (!event) {
      throw new NotFoundException('Evento não encontrado.')
    }

    const participantsCountResult = await event
      .related('participants')
      .query()
      .count('* as total')
      .first()

    const participantsCount = Number(participantsCountResult?.$extras.total || 0)

    if (participantsCount > 0) {
      throw new UnauthorizedAccessException(
        'Não é possível deletar um evento com participantes inscritos.'
      )
    }

    await event.delete()
    return {
      message: 'Evento deletado com sucesso.',
    }
  }
}
