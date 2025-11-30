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
router.post('/auth', [SessionController, 'store'])
router
  .group(() => {
    router.post('/participants', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update']).use(middleware.auth())
    router.get('/me', [UsersController, 'show']).use(middleware.auth())
    router.get('/me/events', [UsersController, 'showEvents']).use(middleware.auth())
    router
      .delete('/events/:id/unsubscribe', [UsersController, 'cancelEventSubscription'])
      .use(middleware.auth())
    router
      .delete('/events/:id', [UsersController, 'deleteEmptyEvent'])
      .use(middleware.auth())
      .use(middleware.userRole())
  })
  .prefix('/users')

router
  .group(() => {
    router.post('/', [EventsController, 'create']).use(middleware.auth()).use(middleware.userRole())
    router
      .patch('/:id', [EventsController, 'update'])
      .use(middleware.auth())
      .use(middleware.userRole())
    router.post('/:id/subscribe', [EventsController, 'eventSubscribe']).use(middleware.auth())
  })
  .prefix('/events')
