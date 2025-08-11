import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ToolingControlController from '../controllers/ToolingControl';

const toolingRouter = Router();

const toolingController = new ToolingControlController();

toolingRouter.use(ensureAuthenticated);

toolingRouter.post('/', toolingController.create);
toolingRouter.get('/', toolingController.index);
toolingRouter.get('/search', toolingController.show);
toolingRouter.put('/:id', toolingController.update);
toolingRouter.delete('/:id', toolingController.delete);
toolingRouter.get('/tooling-filter', toolingController.indexAllFilter);
toolingRouter.get('/list-tooling', toolingController.listToolingControl);
toolingRouter.get('/check', toolingController.check);
toolingRouter.get('/all', toolingController.findAll);

export default toolingRouter;
