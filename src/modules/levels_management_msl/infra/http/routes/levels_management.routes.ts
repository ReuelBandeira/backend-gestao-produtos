import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ManagementController from '../controllers/ManagementController';

const managementRouter = Router();

const managementController = new ManagementController();

managementRouter.use(ensureAuthenticated);

managementRouter.post('/', managementController.create);
managementRouter.get('/', managementController.index);
managementRouter.get('/search', managementController.show);
managementRouter.put('/:id', managementController.update);
managementRouter.delete('/:id', managementController.delete);
managementRouter.get('/find/registers', managementController.findManagement);


export default managementRouter;
