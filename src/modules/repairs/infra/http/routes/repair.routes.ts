import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import RepairController from '../controllers/RepairController';

const repairRouter = Router();

const repairController = new RepairController();

repairRouter.use(ensureAuthenticated);

repairRouter.get('/', repairController.index);
repairRouter.get('/search', repairController.search);
repairRouter.get('/fetch', repairController.fetch);
repairRouter.put('/:id', repairController.update);
repairRouter.get('/filter', repairController.filter);
repairRouter.put('/defect-origin/:id', repairController.updateDefect);

export default repairRouter;
