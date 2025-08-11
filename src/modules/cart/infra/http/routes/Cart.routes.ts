import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import CartController from '../controllers/CartController';

const cartRouter = Router();

const cartController = new CartController();

cartRouter.use(ensureAuthenticated);

cartRouter.post('/', cartController.create);
cartRouter.get('/', cartController.index);
cartRouter.get('/findcar', cartController.findallCar);
cartRouter.get('/search', cartController.show);
cartRouter.put('/:id', cartController.update);
cartRouter.delete('/:id', cartController.delete);
cartRouter.get('/find/registers', cartController.findCarts);
cartRouter.post('/production', cartController.production)

export default cartRouter;
