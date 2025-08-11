import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import PlateWashingController from '../controllers/PlateWashingController';

const plateWashingRouter = Router();

const plateWashingController = new PlateWashingController();

plateWashingRouter.use(ensureAuthenticated);

plateWashingRouter.post('/', plateWashingController.create);
plateWashingRouter.get('/', plateWashingController.index);
plateWashingRouter.get('/search', plateWashingController.show);
plateWashingRouter.put('/:id', plateWashingController.update);
plateWashingRouter.delete('/:id', plateWashingController.delete);
plateWashingRouter.get('/find/registers', plateWashingController.findActions);
plateWashingRouter.post('/plate/washing', plateWashingController.plate_washing);



export default plateWashingRouter;
