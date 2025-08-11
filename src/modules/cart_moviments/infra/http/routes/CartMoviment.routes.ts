import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartMovimentController from '../controllers/CartMovimentController';

const cartMovimentRouter = Router();

const cartMovimentController = new CartMovimentController();

cartMovimentRouter.use(ensureAuthenticated);

cartMovimentRouter.post('/', cartMovimentController.create);
cartMovimentRouter.get('/', cartMovimentController.positions);
cartMovimentRouter.get('/check-component', cartMovimentController.check)
cartMovimentRouter.put('/', cartMovimentController.update)
cartMovimentRouter.delete('/:id_cart', cartMovimentController.delete)
cartMovimentRouter.get('/report', cartMovimentController.report)
cartMovimentRouter.get('/report-car/:id_cart', cartMovimentController.CarByFilter)
export default cartMovimentRouter;
