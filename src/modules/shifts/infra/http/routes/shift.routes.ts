import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ShiftController from '../controllers/ShiftController';

const shiftRouter = Router();

const repairController = new ShiftController();

shiftRouter.use(ensureAuthenticated);

shiftRouter.post('/', repairController.create);
shiftRouter.get('/', repairController.index);
shiftRouter.get('/search', repairController.search);
shiftRouter.get('/all', repairController.show);
shiftRouter.put('/:id', repairController.update);

export default shiftRouter;
