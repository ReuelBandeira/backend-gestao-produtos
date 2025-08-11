import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import MachineController from '../controllers/MachineController';

const machineRouter = Router();

const machineController = new MachineController();

const upload = multer(uploadConfig);

machineRouter.use(ensureAuthenticated);

machineRouter.post('/', upload.single('machine'), machineController.create);

export default machineRouter;
