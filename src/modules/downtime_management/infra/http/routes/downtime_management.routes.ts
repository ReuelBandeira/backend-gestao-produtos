import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import DowntimeManagementController from '../controllers/DowntimeManagement';

const downtimeManagementRouter = Router();

const downtimeManagementController = new DowntimeManagementController();

downtimeManagementRouter.use(ensureAuthenticated);

downtimeManagementRouter.post('/', downtimeManagementController.create);
// machineRegistersRouter.get('/', machineRegistersController.index);
downtimeManagementRouter.get('/search',downtimeManagementController.show);
downtimeManagementRouter.put('/:id', downtimeManagementController.update);
downtimeManagementRouter.delete('/:id', downtimeManagementController.delete);
// machineRegistersRouter.get('/registerd-filter', machineRegistersController.indexAllFilter);
downtimeManagementRouter.get('/list-registerd', downtimeManagementController.listMachine_registers);
downtimeManagementRouter.get('/check/user', downtimeManagementController.checkTypeUser);
downtimeManagementRouter.get('/report/follow_up', downtimeManagementController.ReportDonwtimeFollow_up);
downtimeManagementRouter.get('/report/opening', downtimeManagementController.ReportDonwtimeOpening);
downtimeManagementRouter.get('/report/finalized', downtimeManagementController.ReportDonwtimeFinalized);
downtimeManagementRouter.put('/finalize/downtime/:id', downtimeManagementController.updateFinalize);
downtimeManagementRouter.get('/list/downtime/pagination-registers', downtimeManagementController.listDonwtime_registers_pagination);
downtimeManagementRouter.get('/filter/machine/downtime', downtimeManagementController.filterDowntimeMachines);
downtimeManagementRouter.get('/filter/reason/downtime', downtimeManagementController.filterDowntimeReason);
downtimeManagementRouter.get('/filter/cause/downtime', downtimeManagementController.filterDowntimeCause);
downtimeManagementRouter.get('/filter/action/downtime', downtimeManagementController.filterDowntimeAction);
downtimeManagementRouter.get('/filter/line/downtime', downtimeManagementController.filterDowntimeLine);
downtimeManagementRouter.get('/filter/comment/downtime', downtimeManagementController.filterDowntimeComment);
downtimeManagementRouter.get('/all/machines/downtime', downtimeManagementController.allMachines);
downtimeManagementRouter.get('/all/reasons/downtime', downtimeManagementController.allReasons);
downtimeManagementRouter.get('/all/causes/downtime', downtimeManagementController.allCauses);
downtimeManagementRouter.get('/all/actions/downtime', downtimeManagementController.allActions);
downtimeManagementRouter.get('/all/lines/downtime', downtimeManagementController.allLines);
downtimeManagementRouter.get('/all/comment/downtime', downtimeManagementController.allComments);
downtimeManagementRouter.get('/checkin/history/downtime', downtimeManagementController.checkinHistory);




export default downtimeManagementRouter;
