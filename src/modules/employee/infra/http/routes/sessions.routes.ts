import { Router } from 'express';

import SessionsController from '@modules/employee/infra/http/controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
