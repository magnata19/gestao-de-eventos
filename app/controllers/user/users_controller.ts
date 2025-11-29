import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CreateUserUseCase } from '../../use_case/user/create_user_use_case.js'
import { CreateUserValidator } from '#validators/user/user_validator'
import UserResponseDto from '../../dtos/user/user_response_dto.js'

@inject()
export default class UsersController {

  constructor(protected useCase: CreateUserUseCase) {
  }

  async create({request, response}: HttpContext): Promise<UserResponseDto>{
    const data = await request.validateUsing(CreateUserValidator)
    const user = await this.useCase.create(data);
    response.status(201);
    return user;
  }
}
