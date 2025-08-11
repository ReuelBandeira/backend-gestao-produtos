import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import OvenTemperatureRecordController from '../controllers/OvenTemperatureRecordController';

const OvenTemperatureRecordRouter = Router();

const ovenTemperatureRecordController = new OvenTemperatureRecordController();

OvenTemperatureRecordRouter.use(ensureAuthenticated);

OvenTemperatureRecordRouter.post('/', ovenTemperatureRecordController.create);
OvenTemperatureRecordRouter.get('/', ovenTemperatureRecordController.index);
OvenTemperatureRecordRouter.get('/search', ovenTemperatureRecordController.show);
OvenTemperatureRecordRouter.put('/approverOne/:id', ovenTemperatureRecordController.updateApproverOne);
OvenTemperatureRecordRouter.delete('/:id', ovenTemperatureRecordController.delete);
OvenTemperatureRecordRouter.get('/find/registers', ovenTemperatureRecordController.findOvenTemperatureRecord);
OvenTemperatureRecordRouter.put('/approverTwo/:id', ovenTemperatureRecordController.updateApproverTwo);
OvenTemperatureRecordRouter.get('/find/detail/record', ovenTemperatureRecordController.previousDetail);
OvenTemperatureRecordRouter.get('/find/status/verification', ovenTemperatureRecordController.verificationStatus);


export default OvenTemperatureRecordRouter;
