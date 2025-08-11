import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import DefectController from '../controllers/DefectController';

const defectRouter = Router();

const defectController = new DefectController();

defectRouter.use(ensureAuthenticated);

defectRouter.post('/', defectController.create);
defectRouter.get('/', defectController.index);
defectRouter.get('/search', defectController.show);
defectRouter.put('/:id', defectController.update);
defectRouter.delete('/:id', defectController.delete);
defectRouter.get('/find/type-feeder', defectController.findActions);
defectRouter.get('/all', defectController.all);

export default defectRouter;
