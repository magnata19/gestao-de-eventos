/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const EventsController = () => import('#controllers/event/events_controller')
const SessionController = () => import('#controllers/auth/session_controller')
const UsersController = () => import('#controllers/user/users_controller')

router.group(() => {
  router.post('/auth', [SessionController, 'store'])

  router.post('/users/participants', [UsersController, 'create'])
  router.patch('/users/:id', [UsersController, 'update']).use(middleware.auth())
  router.get('/users/me', [UsersController, 'show']).use(middleware.auth())
  router.get('/users/me/events', [UsersController, 'showEvents']).use(middleware.auth())

  router
    .post('/events', [EventsController, 'create'])
    .use(middleware.auth())
    .use(middleware.userRole())
  router
    .patch('/events/:id', [EventsController, 'update'])
    .use(middleware.auth())
    .use(middleware.userRole())
  router.post('/events/:id/subscribe', [EventsController, 'eventSubscribe']).use(middleware.auth())
})
