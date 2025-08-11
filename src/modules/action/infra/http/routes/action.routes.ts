import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ActionController from '../controllers/ActionController';

const actionRouter = Router();

const actionController = new ActionController();

actionRouter.use(ensureAuthenticated);

actionRouter.post('/', actionController.create);
actionRouter.get('/', actionController.index);
actionRouter.get('/search', actionController.show);
actionRouter.put('/:id', actionController.update);
actionRouter.delete('/:id', actionController.delete);
actionRouter.get('/find/type-feeder', actionController.findActions);


export default actionRouter;
