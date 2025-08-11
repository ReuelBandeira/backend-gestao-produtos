import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CauseController from '../controllers/CauseController';

const causeDowntimeRouter = Router();

const causeDowntimeController = new CauseController();

causeDowntimeRouter.use(ensureAuthenticated);

causeDowntimeRouter.post('/', causeDowntimeController.create);
causeDowntimeRouter.get('/', causeDowntimeController.index);
causeDowntimeRouter.get('/search', causeDowntimeController.show);
causeDowntimeRouter.put('/:id', causeDowntimeController.update);
causeDowntimeRouter.delete('/:id', causeDowntimeController.delete);
// causeDowntimeRouter.get('/list-worksgroups', causeDowntimeController.listWorkGroups);
causeDowntimeRouter.get('/find/registers', causeDowntimeController.findAll);

export default causeDowntimeRouter;
