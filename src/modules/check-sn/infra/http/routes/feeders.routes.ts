import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import FeederController from '../controllers/FeederController';
import TypeFeederController from '../controllers/TypeFeederController';

const feederRouter = Router();

const feederController = new FeederController();
const typeFeederController = new TypeFeederController();

feederRouter.use(ensureAuthenticated);

feederRouter.post('/', feederController.create);
feederRouter.get('/search', feederController.show);
feederRouter.get('/', feederController.index);
feederRouter.get('/type', typeFeederController.index);
feederRouter.put('/:feeder_code', feederController.update);
feederRouter.delete('/:id', feederController.delete);

export default feederRouter;
