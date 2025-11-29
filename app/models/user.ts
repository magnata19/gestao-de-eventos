import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { UserRole } from '../utils/enum.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare cpf: string

  @column({ serializeAs: null }) //evita que a senha seja retornada em respostas JSON
  declare password: string

  @column()
  declare role: UserRole

  @column.dateTime({ autoCreate: true, serializeAs: null})
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null})
  declare updatedAt: DateTime
}
