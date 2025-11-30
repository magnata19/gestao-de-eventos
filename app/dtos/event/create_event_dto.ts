import { DateTime } from 'luxon'

export interface CreateEventDto {
  name: string
  localization: string
  dateTime: DateTime
  maximumCapacity: number
  organizerId: number
}
