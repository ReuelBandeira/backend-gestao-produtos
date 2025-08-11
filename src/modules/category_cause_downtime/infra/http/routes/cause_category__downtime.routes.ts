import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CauseCategoryController from '../controllers/CauseCategoryController';

const causeCategoryDowntimeRouter = Router();

const causeDowntimeController = new CauseCategoryController();

causeCategoryDowntimeRouter.use(ensureAuthenticated);

causeCategoryDowntimeRouter.post('/', causeDowntimeController.create);
causeCategoryDowntimeRouter.get('/', causeDowntimeController.index);
causeCategoryDowntimeRouter.get('/search', causeDowntimeController.show);
causeCategoryDowntimeRouter.put('/:id', causeDowntimeController.update);
causeCategoryDowntimeRouter.delete('/:id', causeDowntimeController.delete);
causeCategoryDowntimeRouter.get('/find/registers', causeDowntimeController.findAll);

export default causeCategoryDowntimeRouter;
