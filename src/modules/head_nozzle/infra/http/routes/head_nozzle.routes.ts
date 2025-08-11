import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import HeadNozzleController from '../controllers/HeadNozzleController';
import MaintenanceHeadNozzleController from '../controllers/MaintenanceHeadNozzleController';

const HeadNozzleRouter = Router();

const headNozzleController = new HeadNozzleController();
const maintenanceHeadNozzleController = new MaintenanceHeadNozzleController();

HeadNozzleRouter.use(ensureAuthenticated);

HeadNozzleRouter.post('/', headNozzleController.create);
HeadNozzleRouter.get('/', headNozzleController.index);
HeadNozzleRouter.get('/search', headNozzleController.show);
HeadNozzleRouter.put('/:id', headNozzleController.update);
HeadNozzleRouter.delete('/:id', headNozzleController.delete);
HeadNozzleRouter.get('/find/registers', headNozzleController.findHeadNozzle);
HeadNozzleRouter.get('/validation', headNozzleController.validation);

// manutenção

HeadNozzleRouter.post('/maintenance', maintenanceHeadNozzleController.create);
HeadNozzleRouter.get('/maintenance', maintenanceHeadNozzleController.index);
HeadNozzleRouter.put('/maintenance/:id', maintenanceHeadNozzleController.update);
HeadNozzleRouter.delete('/maintenance/:id', maintenanceHeadNozzleController.delete);
HeadNozzleRouter.get('/find/registers/maintenance', maintenanceHeadNozzleController.findMaintenanceHeadNozzle);
HeadNozzleRouter.get('/maintenance/report', maintenanceHeadNozzleController.Report);




export default HeadNozzleRouter;
