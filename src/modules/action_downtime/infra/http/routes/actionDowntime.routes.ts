import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ActionController from '../controllers/ActionController';

const actionDowntimeRouter = Router();

const actionController = new ActionController();

actionDowntimeRouter.use(ensureAuthenticated);

actionDowntimeRouter.post('/', actionController.create);
actionDowntimeRouter.get('/', actionController.index);
actionDowntimeRouter.get('/search', actionController.show);
actionDowntimeRouter.put('/:id', actionController.update);
actionDowntimeRouter.delete('/:id', actionController.delete);
actionDowntimeRouter.get('/find/registers', actionController.findActions);


export default actionDowntimeRouter;
