import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import NotFoundException from './not_found_exception.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    const { response } = ctx
    if (error instanceof NotFoundException) {
      return response.notFound({
        error: error.message,
        code: error.code,
        status: error.status,
      })
    }
    if (error.code === 'E_VALIDATION_ERROR') {
      return response.status(422).json({
        status: 422,
        error: 'Validation error',
        messages: error.messages?.errors || error.messages,
      })
    }
    return response.status(error.status || 500).json({
      error: error.message || 'Internal server error',
      name: error.name || 'Error',
      status: error.status || 500,
    })
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
