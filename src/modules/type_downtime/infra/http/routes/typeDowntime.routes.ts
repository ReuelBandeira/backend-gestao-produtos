import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import TypeController from '../controllers/TypeController';

const typeRouter = Router();

const typeController = new TypeController();

typeRouter.use(ensureAuthenticated);

typeRouter.post('/', typeController.create);
typeRouter.get('/', typeController.index);
typeRouter.get('/search', typeController.show);
typeRouter.put('/:id', typeController.update);
typeRouter.delete('/:id', typeController.delete);
typeRouter.get('/list/types', typeController.findType);

export default typeRouter;
