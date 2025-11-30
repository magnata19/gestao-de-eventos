import vine from '@vinejs/vine'
import { validateFutureDate } from '../../utils/functions/event/validate_hour.js'

export const EventValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    localization: vine.string().trim().minLength(3).maxLength(255),
    dateTime: vine.string().use(validateFutureDate()),
    maximumCapacity: vine.number().min(1),
  })
)
