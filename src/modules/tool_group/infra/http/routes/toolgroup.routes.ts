import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ToolgroupController from '../controllers/ToolgroupController';


const toolgroupRouter = Router();
const toolgroupController = new ToolgroupController();


toolgroupRouter.post('/toolgroup', toolgroupController.create);
toolgroupRouter.get('/toolgroup', toolgroupController.index);
toolgroupRouter.get('/toolgroup/search', toolgroupController.show);
toolgroupRouter.put('/toolgroup/:id', toolgroupController.update);
toolgroupRouter.delete('/toolgroup/:id', toolgroupController.delete);
toolgroupRouter.get('/toolgroup/toolgroup-filter', toolgroupController.indexAllFilter);
toolgroupRouter.get('/toolgroup/list-toolgroup', toolgroupController.listToolgroup);
toolgroupRouter.get('/toolgroup/:id', toolgroupController.listToolgroupSelect);

export default toolgroupRouter;
