import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import ProductDelimiterController from '../controllers/ProductDelimiterController';

const productsRouter = Router();

const productController = new ProductController();

const productDelimiterController = new ProductDelimiterController();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productController.create);
productsRouter.get('/', productController.index);
productsRouter.get('/search', productController.show);
productsRouter.put('/:product_name', productController.update);
productsRouter.delete('/:id', productController.delete);
productsRouter.get('/list-products', productController.listProducts);
productsRouter.get('/product/:id', productController.listProductsSelect);
productsRouter.get('/all/composition', productController.findAllProductsWithoutComposition);

productsRouter.post('/delimiter', productDelimiterController.create);
productsRouter.delete('/delimiter/:id', productDelimiterController.delete);
productsRouter.put('/delimiter/:id', productDelimiterController.update);
productsRouter.get('/delimiter', productDelimiterController.index);
productsRouter.get('/delimiter/all', productDelimiterController.listAll);
productsRouter.get('/delimiter/filter', productDelimiterController.filterProduct);


export default productsRouter;
