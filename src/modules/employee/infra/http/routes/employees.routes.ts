import { Router } from 'express';

import EmployeeController from '@modules/employee/infra/http/controllers/EmployeeController';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';

const employeesRouter = Router();

const employeeController = new EmployeeController();

employeesRouter.use(ensureAuthenticated);

employeesRouter.post('/', employeeController.create);
employeesRouter.get('/search', employeeController.show);
employeesRouter.get('/', employeeController.index);
employeesRouter.put('/:username', employeeController.update);
employeesRouter.delete('/:username', employeeController.delete);
employeesRouter.get('/all', employeeController.all);

export default employeesRouter;
