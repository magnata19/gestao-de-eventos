import { inject } from '@adonisjs/core'
import { SignInDto } from '../../dtos/auth/sign_in_dto.js'
import User from '#models/user'
import getAccessTokenAndId from '../../utils/functions/auth/get_access_token_and_id.js'

@inject()
export class SignInUseCase {
  constructor() {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await User.verifyCredentials(email, password)
    return getAccessTokenAndId(user)
  }
}
