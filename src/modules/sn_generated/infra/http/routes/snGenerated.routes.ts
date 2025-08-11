import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import SnGeneratedController from '../controllers/SnGeneratedController';

const snGeneratedRouter = Router();

const snGeneratedController = new SnGeneratedController();

snGeneratedRouter.use(ensureAuthenticated);

snGeneratedRouter.post('/', snGeneratedController.create);
snGeneratedRouter.get('/all', snGeneratedController.all);

export default snGeneratedRouter;
