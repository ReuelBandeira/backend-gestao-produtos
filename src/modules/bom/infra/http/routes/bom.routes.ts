import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import BomController from '../controllers/BomController';

const bomRouter = Router();

const bomController = new BomController();

const upload = multer(uploadConfig);

bomRouter.use(ensureAuthenticated);

bomRouter.post('/', upload.single('bom'), bomController.create);
bomRouter.get('/search', bomController.show);

export default bomRouter;
