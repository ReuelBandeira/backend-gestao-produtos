import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import LineController from '../controllers/LineController';

const linesRouter = Router();

const lineController = new LineController();

linesRouter.get('/list-lines', lineController.listLine);

linesRouter.use(ensureAuthenticated);

linesRouter.post('/', lineController.create);
linesRouter.get('/search', lineController.show);
linesRouter.get('/', lineController.index);
linesRouter.put('/:id', lineController.update);
linesRouter.delete('/:id', lineController.delete);
// adcionado a rota da função listar linhas

linesRouter.get('/machines/lines/positions', lineController.listLinePositions);

export default linesRouter;
