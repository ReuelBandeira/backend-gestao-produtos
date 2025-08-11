import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import MslMachinesController from '../controllers/MslMachinesController';

const mslMachinesRouter = Router();

const mslMachinesController = new MslMachinesController();

mslMachinesRouter.use(ensureAuthenticated);

mslMachinesRouter.post('/', mslMachinesController.create);
mslMachinesRouter.get('/', mslMachinesController.index);
mslMachinesRouter.get('/search', mslMachinesController.show);
mslMachinesRouter.put('/:id', mslMachinesController.update);
mslMachinesRouter.delete('/:id', mslMachinesController.delete);
mslMachinesRouter.get('/all', mslMachinesController.all);
mslMachinesRouter.get('/validate', mslMachinesController.validate);

export default mslMachinesRouter;
