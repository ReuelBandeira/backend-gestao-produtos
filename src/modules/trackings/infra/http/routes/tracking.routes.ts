import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import TrackingController from '../controllers/Tracking';

const trackingRouter = Router();

const trackingController = new TrackingController();

trackingRouter.use(ensureAuthenticated);

trackingRouter.get('/', trackingController.index);
trackingRouter.get('/hour-by-hour', trackingController.show);

export default trackingRouter;
