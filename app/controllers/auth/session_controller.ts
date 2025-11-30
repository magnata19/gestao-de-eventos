import { createSessionValidator } from '#validators/auth/session'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SignInUseCase } from '../../use_case/auth/sign_in_use_case.js'

@inject()
export default class SessionController {
  constructor(protected signInUseCase: SignInUseCase) {}

  async store({ request, response }: HttpContext) {
    const signInDto = await request.validateUsing(createSessionValidator)
    const user = await this.signInUseCase.execute(signInDto)
    return response.ok(user)
  }
}
