import { Router } from 'express';

import EmployeeController from '@modules/employee/infra/http/controllers/EmployeeController';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import PdfEmployeeController from '../controllers/PdfEmployeeController';

const employeesRouter = Router();

const employeeController = new EmployeeController();
const pdfEmployeeController = new PdfEmployeeController();

employeesRouter.get('/render/employee', pdfEmployeeController.index);
employeesRouter.get('/pdf/employee', pdfEmployeeController.create);

employeesRouter.use(ensureAuthenticated);

employeesRouter.post('/', employeeController.create);
employeesRouter.get('/search', employeeController.show);
employeesRouter.get('/', employeeController.index);
employeesRouter.put('/:username', employeeController.update);
employeesRouter.delete('/:username', employeeController.delete);
employeesRouter.get('/all', employeeController.all);

employeesRouter.get('/employees-filter', employeeController.indexAllFilter);

export default employeesRouter;
