import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartCriticalController from '../controllers/CartCriticalController';

const cartCriticalRouter = Router();

const cartCriticalController = new CartCriticalController();

cartCriticalRouter.use(ensureAuthenticated);

cartCriticalRouter.get('/', cartCriticalController.index);

export default cartCriticalRouter;
