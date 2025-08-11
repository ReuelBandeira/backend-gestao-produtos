import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import InactivateToolsController from '../controllers/InactivateToolsController';

const inactivateToolsRouter = Router();

const inactivateToolsController = new InactivateToolsController();

inactivateToolsRouter.use(ensureAuthenticated);

inactivateToolsRouter.post('/', inactivateToolsController.create);
inactivateToolsRouter.get('/', inactivateToolsController.index);
inactivateToolsRouter.get('/search', inactivateToolsController.show);
inactivateToolsRouter.put('/:id', inactivateToolsController.update);
inactivateToolsRouter.delete('/:id', inactivateToolsController.delete);

export default inactivateToolsRouter;
