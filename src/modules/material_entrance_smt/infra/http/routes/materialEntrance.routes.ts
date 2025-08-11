import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import MaterialEntranceController from '../controllers/MaterialEntranceController';
import DetailMaterialEntranceController from '../controllers/DetailMaterialEntranceController';

const materialEntranceRouter = Router();

const materialEntranceController = new MaterialEntranceController();
const detailMaterialEntranceController = new DetailMaterialEntranceController();

materialEntranceRouter.use(ensureAuthenticated);

materialEntranceRouter.post('/', materialEntranceController.create);
materialEntranceRouter.get('/', materialEntranceController.index);
materialEntranceRouter.get('/search', materialEntranceController.show);
materialEntranceRouter.put('/:id', materialEntranceController.update);
materialEntranceRouter.delete('/:id', materialEntranceController.delete);
materialEntranceRouter.get('/find/registers', materialEntranceController.findActions);
// materialEntranceRouter.get('/receive/materials', materialEntranceController.receivedBom);
materialEntranceRouter.get('/validation/materials', materialEntranceController.validationMaterials);
// materialEntranceRouter.get('/teste/materials', materialEntranceController.teste);
materialEntranceRouter.get('/receive/materials', materialEntranceController.materialXbom);
// colocar total de lidos e não lidos



materialEntranceRouter.post('/detail', detailMaterialEntranceController.create);
materialEntranceRouter.get('/detail', detailMaterialEntranceController.index);
materialEntranceRouter.get('/search/detail', detailMaterialEntranceController.show);
materialEntranceRouter.put('/detail/:id', detailMaterialEntranceController.update);
materialEntranceRouter.delete('/detail/:id', detailMaterialEntranceController.delete);
materialEntranceRouter.get('/detail/registers', detailMaterialEntranceController.findActions);
materialEntranceRouter.get('/detail/entrance/validation', detailMaterialEntranceController.validationEntrance);




export default materialEntranceRouter;
