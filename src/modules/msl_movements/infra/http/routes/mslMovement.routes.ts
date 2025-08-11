import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import MslMovementController from '../controllers/MslMovementController';

const mslMovementRouter = Router();

const mslMovementeController = new MslMovementController();

mslMovementRouter.use(ensureAuthenticated);

mslMovementRouter.post('/iqc', mslMovementeController.create);
mslMovementRouter.get('/iqc', mslMovementeController.limit);
mslMovementRouter.post('/operation', mslMovementeController.createOperation);

export default mslMovementRouter;
