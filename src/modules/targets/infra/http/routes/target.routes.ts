import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import TargetController from '../controllers/TargetController';

const targetRouter = Router();

const targetController = new TargetController();

targetRouter.use(ensureAuthenticated);

targetRouter.post('/', targetController.create);
targetRouter.get('/', targetController.index);
targetRouter.get('/all', targetController.all);
targetRouter.get('/search', targetController.search);
targetRouter.put('/:id', targetController.update);
targetRouter.delete('/:id', targetController.delete);

export default targetRouter;
