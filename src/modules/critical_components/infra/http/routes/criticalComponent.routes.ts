import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CriticalComponentController from '../controllers/CriticalComponentController';

const criticalComponentRouter = Router();

const criticalComponentController = new CriticalComponentController();

criticalComponentRouter.use(ensureAuthenticated);

criticalComponentRouter.get('/', criticalComponentController.all);

export default criticalComponentRouter;
