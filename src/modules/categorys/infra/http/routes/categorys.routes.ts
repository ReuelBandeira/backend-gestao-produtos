import { Router } from 'express';
import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import CategoryController from '../controllers/CategoryController';

const CategoryRouter = Router();

const categorysController = new CategoryController();

CategoryRouter.use(ensureAuthenticated);

CategoryRouter.post('/', categorysController.create);
CategoryRouter.get('/', categorysController.findCategory);
CategoryRouter.get('/search', categorysController.show);
CategoryRouter.put('/:id', categorysController.update);
CategoryRouter.delete('/:id', categorysController.delete);

export default CategoryRouter;
