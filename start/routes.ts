/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SessionController = () => import('#controllers/auth/session_controller')
const UsersController = () => import('#controllers/user/users_controller')

router.group(() => {
  router.post('/users/participants', [UsersController, 'create'])
  router.post('/auth', [SessionController, 'store'])
})
