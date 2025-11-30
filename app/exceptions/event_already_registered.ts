import { Exception } from '@adonisjs/core/exceptions'

export default class EventAlreadyRegistered extends Exception {
  constructor(message: string) {
    super(message, { status: 409 })
  }
}
