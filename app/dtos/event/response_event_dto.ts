import { DateTime } from 'luxon'

export interface ResponseEventDto {
  id: number
  name: string
  localization: string
  dateTime: DateTime
  maximumCapacity: number
  organizerId: number
}
