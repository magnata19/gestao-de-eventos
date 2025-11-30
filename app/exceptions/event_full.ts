import { Exception } from '@adonisjs/core/exceptions'

export default class EventFullException extends Exception {
  constructor(message: string) {
    super(message, { status: 409 })
  }
}
