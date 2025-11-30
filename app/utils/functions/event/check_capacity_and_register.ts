import EventFullException from '#exceptions/event_full'
import Event from '#models/event'

export async function checkCapacityAndRegister(event: Event, userId: number) {
  await Event.transaction(async (trx) => {
    //evita que duas pessoas peguem a ultima vaga ao mesmo tempo
    const lockedEvent = await Event.query({ client: trx })
      .where('id', event.id)
      .forUpdate()
      .firstOrFail()

    //quantas pessoas estão inscritas
    const participantCount = await lockedEvent
      .related('participants')
      .query()
      .count('* as total')
      .first()

    //verifica se atingiu a capacidade máxima
    if (Number(participantCount?.$extras.total || 0) >= lockedEvent.maximumCapacity) {
      throw new EventFullException('O evento atingiu sua capacidade máxima.')
    }

    await lockedEvent.related('participants').attach([userId], trx)
  })
}
