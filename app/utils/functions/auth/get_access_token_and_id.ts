import User from '#models/user'
import SignInResponse from '../../interface/sign_in_response.js'

export default async function getAccessTokenAndId(user: User): Promise<SignInResponse> {
  const fullToken = await User.accessTokens.create(user)
  const { token, type } = fullToken.toJSON()
  return { token: { token, type }, id: user.id }
}
