import User from '#models/user'
import { UserCreateDto } from '../dtos/user/create_user_dto.js'

export default class UserRepository {

  async create(data: UserCreateDto): Promise<User> {
    return await User.create(data);
  }
}
