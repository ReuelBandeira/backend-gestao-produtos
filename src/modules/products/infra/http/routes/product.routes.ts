import { Router } from 'express';
import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import ProductController from '../controllers/ProductController';

const ProductRouter = Router();

const productsController = new ProductController();

ProductRouter.use(ensureAuthenticated);

ProductRouter.post('/', productsController.create);
ProductRouter.get('/', productsController.index);
ProductRouter.get('/search', productsController.show);
ProductRouter.put('/:id', productsController.update);
ProductRouter.delete('/:id', productsController.delete);
ProductRouter.get('/find/registers', productsController.findProduct);

export default ProductRouter;
