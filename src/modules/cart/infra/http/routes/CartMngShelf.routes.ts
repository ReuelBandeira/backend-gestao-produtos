import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartController from '../controllers/CartController';

const cartMngShelfRouter = Router();

const cartController = new CartController();

cartMngShelfRouter.use(ensureAuthenticated);

cartMngShelfRouter.get('/', cartController.indexMng);

cartMngShelfRouter.get('/all', cartController.findJoinMngShelf);

cartMngShelfRouter.get('/find/registers', cartController.findMngShelfs);


export default cartMngShelfRouter;
