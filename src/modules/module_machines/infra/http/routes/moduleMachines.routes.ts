import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ModulesController from '../controllers/ModulesController';

const moduleRouter = Router();

const moduleController = new ModulesController();

moduleRouter.use(ensureAuthenticated);

moduleRouter.post('/', moduleController.create);
moduleRouter.get('/', moduleController.index);
moduleRouter.get('/search', moduleController.show);
moduleRouter.put('/:id', moduleController.update);
moduleRouter.delete('/:id', moduleController.delete);
moduleRouter.get('/list/types', moduleController.findModule);

export default moduleRouter;
