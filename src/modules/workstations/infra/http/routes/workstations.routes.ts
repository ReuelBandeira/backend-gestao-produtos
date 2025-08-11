import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import WorkStationController from '../controllers/WorkStationController';

const workStationController = new WorkStationController();
const workStationsRouter = Router();

workStationsRouter.use(ensureAuthenticated);

workStationsRouter.get('/', workStationController.index);
workStationsRouter.post('/', workStationController.create);
workStationsRouter.delete('/:id', workStationController.delete);

export default workStationsRouter;
