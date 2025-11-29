import { UserRole } from '../../utils/enum.js'

export interface UserCreateDto {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: UserRole;
}
