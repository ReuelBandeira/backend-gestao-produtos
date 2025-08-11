import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CauseController from '../controllers/CauseController';

const causeRouter = Router();

const causeController = new CauseController();

causeRouter.use(ensureAuthenticated);

causeRouter.post('/', causeController.create);
causeRouter.get('/', causeController.index);
causeRouter.get('/all', causeController.all);
causeRouter.get('/search', causeController.show);
causeRouter.put('/:id', causeController.update);
causeRouter.delete('/:id', causeController.delete);
causeRouter.get('/list-worksgroups', causeController.listWorkGroups);
causeRouter.get('/find/type-feeder', causeController.findActions);

export default causeRouter;
