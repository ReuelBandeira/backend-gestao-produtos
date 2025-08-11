import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import { SqueegeeController } from '../controllers/SqueegeeController';

const squeegeeRouter = Router();

const squeegeeController = new SqueegeeController();

squeegeeRouter.use(ensureAuthenticated);

squeegeeRouter.post('/', squeegeeController.create);
squeegeeRouter.get('/', squeegeeController.index);
squeegeeRouter.get('/search', squeegeeController.show);
squeegeeRouter.put('/:id', squeegeeController.update);
squeegeeRouter.delete('/:id', squeegeeController.delete);

export default squeegeeRouter;
