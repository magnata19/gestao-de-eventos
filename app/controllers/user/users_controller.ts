import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CreateUserUseCase } from '../../use_case/user/create_user_use_case.js'
import { CreateUserValidator } from '#validators/user/user_validator'
import UserResponseDto from '../../dtos/user/user_response_dto.js'
import { UpdateUserUseCase } from '../../use_case/user/update_user_use_case.js'
import { UpdateUserValidator } from '#validators/user/update_user_validator'
import { ShowRegisteredEventsUseCase } from '../../use_case/user/show_registered_events.js'
import DeleteEventSubscriptionUseCase from '../../use_case/user/delete_event_subscription_use_case.js'
import DeleteOnlyEmptyEventsUseCase from '../../use_case/user/delete_only_empty_events.js'

@inject()
export default class UsersController {
  constructor(
    protected createUserUseCase: CreateUserUseCase,
    protected updateUserUseCase: UpdateUserUseCase,
    protected showRegisteredEvents: ShowRegisteredEventsUseCase,
    protected deleteEventSubscriptionUseCase: DeleteEventSubscriptionUseCase,
    protected deleteEmptyEventUseCase: DeleteOnlyEmptyEventsUseCase
  ) {}

  async create({ request, response }: HttpContext): Promise<UserResponseDto> {
    const data = await request.validateUsing(CreateUserValidator)
    const user = await this.createUserUseCase.create(data)
    response.status(201)
    return user
  }

  async update({ params, request, response }: HttpContext): Promise<UserResponseDto | null> {
    const userId = params.id
    const data = await request.validateUsing(UpdateUserValidator)
    const user = await this.updateUserUseCase.update(userId, data)
    response.status(200)
    return user
  }

  async show({ auth }: HttpContext): Promise<UserResponseDto> {
    const user = auth.user!
    return user
  }

  async showEvents({ auth }: HttpContext): Promise<any> {
    const userId = auth.user!.id
    const events = await this.showRegisteredEvents.execute(userId)
    return events
  }

  async cancelEventSubscription({ params, auth, response }: HttpContext): Promise<any> {
    const userId = auth.user!.id
    const eventId = params.id
    const result = await this.deleteEventSubscriptionUseCase.execute(userId, eventId)
    response.status(200)
    return result
  }

  async deleteEmptyEvent({ params, auth, response }: HttpContext): Promise<any> {
    const userId = auth.user!.id
    const eventId = params.id
    const result = await this.deleteEmptyEventUseCase.execute(userId, eventId)
    response.status(200)
    return result
  }
}
