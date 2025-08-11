import { Router } from 'express';

import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';

import multer from 'multer';
import uploadConfig from '@config/upload';
import MaterialManagerController from '../controllers/MaterialManagerController';
import PdfMaterialController from '../controllers/PdfMaterialController';
import ComponentMaterialController from '../controllers/ComponentMaterialController';
import DetailMaterialController from '../controllers/DetailMaterialController';
import ComponentUnread from '../controllers/ComponentUnread';

import ListCodeMaterialController from '../controllers/ListCodeMaterialController';
import ModuleMaterialController from '../controllers/ModuleMaterialController';
import PositionMaterialController from '../controllers/PositionMaterialController';
import FeederMaterialController from '../controllers/FeederMaterialController';
import SetupMaterialManagerController from '../controllers/SetupMaterialManagerController';
import RefilMaterialManagerController from '../controllers/RefilMaterialManagerController';
import LineMaterialController from '../controllers/LineMaterialController';
import QualityMaterialManagerController from '../controllers/QualityMaterialManagerController';
import LogSetupMaterialController from '../controllers/LogSetupMaterialController';


//
import LogQualityMaterialController from '../controllers/LogQualityMaterialController';

import LogRefilMaterialController from '../controllers/LogRefilMaterialController';

import LogChangeFeederMaterialController from '../controllers/LogChangeFeederMaterialController';

//  feeder pitch autorização
import LogAuthorizationFeederPitchMaterialController from '../controllers/LogAuthorizationFeederPitchMaterialController';


//  Refil autorização
import LogRefilAuthorizationMaterialController from '../controllers/LogAuthorizationRefilMaterialController';
//


//
import LogRoutineFinishController from '../controllers/LogRoutineFinishController';
//
import ListProductsMaterialController from '../controllers/ListProductsMaterialController';
import FeederPitchMaterialController from '../controllers/FeederPitchMaterialController';
import FeederValidationController from '../controllers/FeederValidationController';

//

const materialManagerRouter = Router();

const materialManagerController = new MaterialManagerController();
const pdfMaterialController = new PdfMaterialController();
const componentMaterialController = new ComponentMaterialController();
const detailMaterialController = new DetailMaterialController();
const componentUnread = new ComponentUnread();

const listCodeMaterialController = new ListCodeMaterialController();
const moduleMaterialController = new ModuleMaterialController();
const positionMaterialController = new PositionMaterialController();
const feederMaterialController = new FeederMaterialController();
const setupMaterialController = new SetupMaterialManagerController();
const refilMaterialController = new RefilMaterialManagerController();
const qualityMaterialController = new QualityMaterialManagerController();

const listProductsMaterialController = new ListProductsMaterialController();

const logSetupMaterialController = new LogSetupMaterialController();
const logQualityMaterialController = new LogQualityMaterialController();
const logRefilMaterialController = new LogRefilMaterialController();
const logChangeFeederMaterialController = new LogChangeFeederMaterialController();

// feeder autorizaçã0

const logAuthorizationFeederPitchMaterialController = new LogAuthorizationFeederPitchMaterialController();
// Refil autorizaçã0
const logRefilAuthorizationMaterialController = new LogRefilAuthorizationMaterialController();

const logRoutineFinishController = new LogRoutineFinishController();

const feederPitchMaterialController = new FeederPitchMaterialController();

const lineNameSetup = new LineMaterialController();

const feederValidation = new FeederValidationController();

materialManagerRouter.get('/render/:list_code', pdfMaterialController.index);

materialManagerRouter.get('/pdf/:list_code', pdfMaterialController.create);

materialManagerRouter.use(ensureAuthenticated);

materialManagerRouter.patch('/feeder-pitch', feederPitchMaterialController.update);

materialManagerRouter.get('/', materialManagerController.index);
materialManagerRouter.get('/search', materialManagerController.show);
materialManagerRouter.get('/material-filter', materialManagerController.indexFilter);


// ? Validação no Setup e Refil
materialManagerRouter.get('/line', lineNameSetup.show);
materialManagerRouter.get('/list_code', listCodeMaterialController.show);
materialManagerRouter.get('/module', moduleMaterialController.show); // Usado no SETUP e REFIL e Qualidade
materialManagerRouter.get('/position', positionMaterialController.show);
materialManagerRouter.get('/feeder', feederMaterialController.show);
materialManagerRouter.get('/component', componentMaterialController.show);
materialManagerRouter.post('/setup', setupMaterialController.create);
materialManagerRouter.post('/refil', refilMaterialController.create);
materialManagerRouter.post('/quality', qualityMaterialController.create);
materialManagerRouter.post('/feeder', feederMaterialController.create);

// ? Validação Feeder
materialManagerRouter.get('/validation/feeder', feederValidation.feederValidation);

materialManagerRouter.get('/list-products/list_code', listProductsMaterialController.show);

materialManagerRouter.get('/feeder-pitch', feederPitchMaterialController.show);

materialManagerRouter.get('/log-setup', logSetupMaterialController.show);

materialManagerRouter.get('/log-routine-finish', logRoutineFinishController.show);

materialManagerRouter.get('/component-unread', componentUnread.show);

materialManagerRouter.get('/log-quality', logQualityMaterialController.show);

materialManagerRouter.get('/log-refil', logRefilMaterialController.show);
materialManagerRouter.get('/log-feeder', logChangeFeederMaterialController.show);

//  fedder pitch autorização
materialManagerRouter.get('/log-feeder-pitch', logAuthorizationFeederPitchMaterialController.show);
//  Refil pitch autorização
materialManagerRouter.get('/log-refil-authorization', logRefilAuthorizationMaterialController.show);

// ? Demais end-points
materialManagerRouter.get('/:list_code', detailMaterialController.show);
materialManagerRouter.post('/', materialManagerController.create);
materialManagerRouter.patch('/finish', setupMaterialController.update);
materialManagerRouter.patch('/list-staus-online', setupMaterialController.updateStatusListOnline);
materialManagerRouter.patch('/:id', componentMaterialController.update);
materialManagerRouter.delete('/:list_code', materialManagerController.delete);
materialManagerRouter.get('/validation/string/component', setupMaterialController.validationString);

const upload = multer(uploadConfig);

materialManagerRouter.post('/upload/:list_code', upload.single('pdf'), materialManagerController.upload)

export default materialManagerRouter;
