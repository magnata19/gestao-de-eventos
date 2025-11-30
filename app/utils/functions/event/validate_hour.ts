import vine, { errors } from '@vinejs/vine'
import { DateTime } from 'luxon'

export const validateFutureDate = vine.createRule((value: any, options, field) => {
  const date = DateTime.fromFormat(value, 'dd/MM/yyyy HH:mm')

  if (!date.isValid) {
    throw new errors.E_VALIDATION_ERROR({
      message: 'Formato de data inválido. Use dd/MM/yyyy HH:mm',
      field: field.name,
      rule: 'dateFormat',
    })
  }

  if (date <= DateTime.now()) {
    throw new errors.E_VALIDATION_ERROR({
      message: 'A data do evento deve ser no futuro',
      field: field.name,
      rule: 'futureDate',
    })
  }
})
