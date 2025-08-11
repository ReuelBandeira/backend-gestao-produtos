import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import OvenController from '../controllers/OvenController';

const OvenRouter = Router();

const ovenController = new OvenController();

OvenRouter.use(ensureAuthenticated);

OvenRouter.post('/', ovenController.create);
OvenRouter.get('/', ovenController.index);
OvenRouter.get('/search', ovenController.show);
OvenRouter.put('/:id', ovenController.update);
OvenRouter.delete('/:id', ovenController.delete);
OvenRouter.get('/find/registers', ovenController.findOven);


export default OvenRouter;
