import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartController from '../controllers/CartController';

const cartShelfRouter = Router();

const cartController = new CartController();

cartShelfRouter.use(ensureAuthenticated);

cartShelfRouter.get('/', cartController.findShelfs);


export default cartShelfRouter;
