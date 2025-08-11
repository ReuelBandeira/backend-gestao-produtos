import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import SolutionsController from '../controllers/SolutionController';

const solutionRouter = Router();

const solutionController = new SolutionsController();

solutionRouter.use(ensureAuthenticated);

solutionRouter.post('/', solutionController.create);
solutionRouter.get('/', solutionController.index);
solutionRouter.get('/all', solutionController.indexCodes);
solutionRouter.get('/search', solutionController.search);
solutionRouter.put('/:id', solutionController.update);
solutionRouter.delete('/:id', solutionController.delete);

export default solutionRouter;
