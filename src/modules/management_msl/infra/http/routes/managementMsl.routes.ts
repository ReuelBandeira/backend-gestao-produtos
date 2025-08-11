import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ManagementMslController from '../controllers/ManagementMslController';

const managementMslRouter = Router();

const managementMslController = new ManagementMslController();

const upload = multer(uploadConfig);

managementMslRouter.use(ensureAuthenticated);

managementMslRouter.post(
  '/import',
  upload.single('file'),
  managementMslController.import,
);

managementMslRouter.post('/', managementMslController.create);
managementMslRouter.get('/', managementMslController.index);
managementMslRouter.get('/all', managementMslController.all);
managementMslRouter.get('/search', managementMslController.search);
managementMslRouter.put('/:id', managementMslController.update);
managementMslRouter.delete('/:id', managementMslController.delete);
managementMslRouter.get('/filter/all', managementMslController.filterAll);
managementMslRouter.get(
  '/filter/paginate',
  managementMslController.filterPaginate
);

export default managementMslRouter;
