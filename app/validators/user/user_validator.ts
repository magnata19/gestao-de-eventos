import vine from '@vinejs/vine'
import { UserRole } from '../../utils/enum.js'

export const CreateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    cpf: vine.string().trim().regex(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/),
    password: vine.string().trim().minLength(6),
    role: vine.enum(UserRole)
  })
)
