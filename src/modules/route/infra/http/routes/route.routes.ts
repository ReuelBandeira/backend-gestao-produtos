import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import RouteBodyController from '../controllers/RouteBodyController';
import RouteHeadController from '../controllers/RouteHeadController';

const routesRouter = Router();

const routeBodyController = new RouteBodyController();
const routeHeadController = new RouteHeadController();

routesRouter.use(ensureAuthenticated);

routesRouter.post('/head/', routeHeadController.create);
routesRouter.get('/head/', routeHeadController.index);
routesRouter.get('/head-all/', routeHeadController.routerAll);
routesRouter.get('/head/search', routeHeadController.show);
routesRouter.put('/head/:id', routeHeadController.update);
routesRouter.delete('/head/:id', routeHeadController.delete);
routesRouter.post('/body/', routeBodyController.create);
routesRouter.get('/body/', routeBodyController.index);
routesRouter.delete('/body/:id', routeBodyController.delete);
routesRouter.get('/body/:route_head_id', routeBodyController.index);

export default routesRouter;
