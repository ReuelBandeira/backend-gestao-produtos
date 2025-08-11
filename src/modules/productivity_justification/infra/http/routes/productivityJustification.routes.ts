import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ProductivityJustificationController from '../controllers/ProductivityJustificationRepositoryController';

const productivityJustificationRouter = Router();

const productivityJustificationController = new ProductivityJustificationController();

productivityJustificationRouter.use(ensureAuthenticated);

productivityJustificationRouter.post('/', productivityJustificationController.create);
productivityJustificationRouter.get('/', productivityJustificationController.index);

export default productivityJustificationRouter;
