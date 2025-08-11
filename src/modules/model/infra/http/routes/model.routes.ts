import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ModelController from '../controllers/ModelController';

const ModelRouter = Router();

const modelController = new ModelController();

ModelRouter.use(ensureAuthenticated);

ModelRouter.post('/', modelController.create);
ModelRouter.get('/', modelController.index);
ModelRouter.get('/search', modelController.show);
ModelRouter.put('/:id', modelController.update);
ModelRouter.delete('/:id', modelController.delete);
ModelRouter.get('/find/registers', modelController.findModel);


export default ModelRouter;
