import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import OriginController from '../controllers/OriginController';

const originRouter = Router();

const originController = new OriginController();

originRouter.use(ensureAuthenticated);

originRouter.post('/', originController.create);
originRouter.get('/', originController.index);
originRouter.get('/all', originController.indexCodes);
originRouter.get('/search', originController.search);
originRouter.put('/:id', originController.update);
originRouter.delete('/:id', originController.delete);

export default originRouter;
