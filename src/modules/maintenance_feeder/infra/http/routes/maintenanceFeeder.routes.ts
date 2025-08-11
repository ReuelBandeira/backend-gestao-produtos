import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import MaintenanceFeederController from '../controllers/MaintenanceFeeder';

const maintenanceRouter = Router();

const maintenanceFeeder = new MaintenanceFeederController();

maintenanceRouter.use(ensureAuthenticated);

maintenanceRouter.post('/', maintenanceFeeder.create);
maintenanceRouter.post('/actions/feeders', maintenanceFeeder.create_maintenance_actions);
maintenanceRouter.get('/', maintenanceFeeder.index);
maintenanceRouter.get('/search', maintenanceFeeder.show);
maintenanceRouter.put('/:id', maintenanceFeeder.update);
maintenanceRouter.delete('/:id', maintenanceFeeder.delete);
maintenanceRouter.get('/maintenance-filter', maintenanceFeeder.indexAllFilter);
maintenanceRouter.get('/list-maintenance', maintenanceFeeder.listMaintenanceFeeder);
maintenanceRouter.get('/date-feeder', maintenanceFeeder.dateFeeder);
maintenanceRouter.get('/filter-idfeeder', maintenanceFeeder.filterFeeder);
maintenanceRouter.get('/date-feedertype', maintenanceFeeder.dateFeederType);
maintenanceRouter.get('/date-allfilter', maintenanceFeeder.allfilterDate);
maintenanceRouter.get('/feeder/check', maintenanceFeeder.checkFeeder);
maintenanceRouter.get('/code/feeder/check', maintenanceFeeder.filterFeeder_code);



export default maintenanceRouter;
