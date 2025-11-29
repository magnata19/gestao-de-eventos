import { inject } from '@adonisjs/core'
import { SignInDto } from '../../dtos/auth/sign_in_dto.js'
import User from '#models/user'

@inject()
export class SignInUseCase {
  constructor() {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await User.verifyCredentials(email, password)
    return User.accessToken.create(user)
  }
}
