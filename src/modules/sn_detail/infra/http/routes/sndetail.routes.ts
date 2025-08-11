import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import SNDetailController from '../controllers/SNDetailController';

const sNDetailRouter = Router();
const sNDetailController = new SNDetailController();

sNDetailRouter.use(ensureAuthenticated);

sNDetailRouter.get('/', sNDetailController.show);

export default sNDetailRouter;
