import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import FamilyRecordController from '../controllers/FamilyRecordController';

const FamilyRecordRouter = Router();

const familyRecordController = new FamilyRecordController();

FamilyRecordRouter.use(ensureAuthenticated);

FamilyRecordRouter.post('/', familyRecordController.create);
FamilyRecordRouter.get('/', familyRecordController.index);
FamilyRecordRouter.get('/search', familyRecordController.show);
FamilyRecordRouter.put('/:id', familyRecordController.update);
FamilyRecordRouter.delete('/:id', familyRecordController.delete);
FamilyRecordRouter.get('/find/registers', familyRecordController.findFamilyRecord);


export default FamilyRecordRouter;
