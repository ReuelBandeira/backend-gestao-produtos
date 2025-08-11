import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import ProductionOrdersController from '../controllers/ProductionOrdersController';



const productionOrdersRouter = Router();


const productionOrdersController = new ProductionOrdersController();


const upload = multer(uploadConfig);

productionOrdersRouter.use(ensureAuthenticated);

productionOrdersRouter.post(
  '/',
  upload.single('order'),
  productionOrdersController.create,
);
productionOrdersRouter.put('/:id', productionOrdersController.update);
productionOrdersRouter.delete('/', productionOrdersController.delete);
productionOrdersRouter.get('/det', productionOrdersController.detail);
productionOrdersRouter.get('/season', productionOrdersController.season);
productionOrdersRouter.get('/search', productionOrdersController.show);
productionOrdersRouter.get('/history', productionOrdersController.historical);
productionOrdersRouter.get('/', productionOrdersController.index);
productionOrdersRouter.get('/:mo_code', productionOrdersController.findPO);
productionOrdersRouter.patch('/:id', productionOrdersController.updateStatus);
productionOrdersRouter.get('/all/filter/coluns', productionOrdersController.indexFilter);
productionOrdersRouter.get('/find/products', productionOrdersController.ProductsPo);
productionOrdersRouter.get('/balances/op', productionOrdersController.opBalances);
productionOrdersRouter.get('/all/composition', productionOrdersController.opsWithComposition);




export default productionOrdersRouter;
