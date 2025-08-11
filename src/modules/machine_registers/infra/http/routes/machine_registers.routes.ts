import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import MachineRegistersController from '../controllers/MachineRegisters';

const machineRegistersRouter = Router();

const machineRegistersController = new MachineRegistersController();

machineRegistersRouter.use(ensureAuthenticated);

machineRegistersRouter.post('/', machineRegistersController.create);

machineRegistersRouter.get('/search',machineRegistersController.show);
machineRegistersRouter.put('/:id', machineRegistersController.update);
machineRegistersRouter.delete('/:id', machineRegistersController.delete);
machineRegistersRouter.get('/registerd-filter', machineRegistersController.indexAllFilter);
machineRegistersRouter.get('/list-registerd', machineRegistersController.listMachine_registers);
machineRegistersRouter.get('/positions/lines', machineRegistersController.line_positions);
machineRegistersRouter.get('/total/positionslines', machineRegistersController.total_index_positions);
machineRegistersRouter.get('/check/sn/machine', machineRegistersController.checkSnMachine);
machineRegistersRouter.get('/lines/check', machineRegistersController.lines);
machineRegistersRouter.get('/machines/lines', machineRegistersController.lines_machines);
machineRegistersRouter.get('/find/module', machineRegistersController.checkModuleMachine);
machineRegistersRouter.get('/machine/module/sn', machineRegistersController.SnMachineModule);
machineRegistersRouter.get('/find/name/module', machineRegistersController.findNameModule);
machineRegistersRouter.get('/machine/description/validation', machineRegistersController.validationDescription);


export default machineRegistersRouter;
