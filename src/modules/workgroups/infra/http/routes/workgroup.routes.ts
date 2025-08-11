import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import WorkgroupsController from '../controllers/WorkgroupsController';

const workgroupsRouter = Router();

const workgroupController = new WorkgroupsController();

workgroupsRouter.use(ensureAuthenticated);

workgroupsRouter.post('/', workgroupController.create);
workgroupsRouter.get('/', workgroupController.index);
workgroupsRouter.get('/search', workgroupController.show);
workgroupsRouter.put('/:id', workgroupController.update);
workgroupsRouter.delete('/:id', workgroupController.delete);
workgroupsRouter.get('/list-worksgroups', workgroupController.listWorkGroups);

export default workgroupsRouter;
