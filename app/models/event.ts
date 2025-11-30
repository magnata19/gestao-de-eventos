import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @manyToMany(() => User, {
    pivotTable: 'event_partipants',
    pivotTimestamps: true,
  })
  declare participants: ManyToMany<typeof User>

  @column()
  declare name: string

  @column()
  declare localization: string

  @column.dateTime()
  declare dateTime: DateTime

  @column()
  declare maximumCapacity: number

  @column()
  declare organizerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
