import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import StencilWashController from '../controllers/StencilWashController';

const stencilWashRuter = Router();

const stencilWashController = new StencilWashController();

stencilWashRuter.use(ensureAuthenticated);

stencilWashRuter.post('/', stencilWashController.create);
stencilWashRuter.get('/', stencilWashController.index);
stencilWashRuter.get('/all', stencilWashController.all);

export default stencilWashRuter;
