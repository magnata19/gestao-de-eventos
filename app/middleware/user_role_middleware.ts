import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { UserRole } from '../utils/enum.js'
import UnauthorizedAccessException from '#exceptions/unauthorized_access_exception'

export default class UserRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user

    if (!user) {
      throw new UnauthorizedAccessException('Usuário não autenticado.')
    }

    if (user?.role !== UserRole.ORGANIZER) {
      throw new UnauthorizedAccessException('Você não tem permissão para acessar este recurso.')
    }

    const output = await next()
    return output
  }
}
