import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '../../app/utils/enum.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('cpf').notNullable()
      table.string('password').notNullable()
      table.enum('role', Object.values(UserRole)).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
