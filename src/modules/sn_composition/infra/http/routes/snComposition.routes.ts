import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import SnCompositionController from '../controllers/SnCompositionController';

const snCompositionRouter = Router();

const snCompositionController = new SnCompositionController();

snCompositionRouter.use(ensureAuthenticated);

snCompositionRouter.post('/', snCompositionController.create);
snCompositionRouter.get('/all', snCompositionController.all);
snCompositionRouter.get('/search', snCompositionController.search);
snCompositionRouter.delete('/:id', snCompositionController.delete);

export default snCompositionRouter;
