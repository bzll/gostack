import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.post('/sessions', SessionController.store);

// Those routes below will be validated by the middleware auth.js
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;
