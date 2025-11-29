import User from '#models/user'
import { UserCreateDto } from '../dtos/user/create_user_dto.js'

export default class UserRepository {
  async create(data: UserCreateDto): Promise<User> {
    return await User.create(data)
  }

  async findById(id: number): Promise<User | null> {
    return User.query().where('id', id).first()
  }
}
