import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import MaintenanceController from '../controllers/MaintenanceController';
import MaintenanceTopMachinesController from '../controllers/MaintenanceTopMachinesController';
import MaintenanceMtbfController from '../controllers/MaintenanceMtbfController';
import MaintenanceMttrController from '../controllers/MaintenanceMttrController';

const ViewsMaintenanceRouter = Router();

const maintenanceController = new MaintenanceController();
const maintenanceTopMachinesController = new MaintenanceTopMachinesController();
const maintenanceMtbr = new MaintenanceMtbfController();
const maintenanceMttr = new MaintenanceMttrController();

ViewsMaintenanceRouter.use(ensureAuthenticated);

ViewsMaintenanceRouter.get('/maintenance/allDw', maintenanceController.allDw);
ViewsMaintenanceRouter.get('/maintenance/top/machines', maintenanceTopMachinesController.MachinesMaintenanceTop);
ViewsMaintenanceRouter.get('/maintenance/mtbf', maintenanceMtbr.allMtbf);
ViewsMaintenanceRouter.get('/maintenance/mttr/all', maintenanceMttr.allMaintenanceMttr);






export default ViewsMaintenanceRouter;
