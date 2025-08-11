import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';

import QualityFamilyController from '../controllers/CreateQualityFamilyController';


const viewsQualityRouter = Router();

const qualityFamilyController = new  QualityFamilyController();

viewsQualityRouter.use(ensureAuthenticated);

// vw_quality_family
viewsQualityRouter.get('/quality/family', qualityFamilyController.findDateQualityFamily);

viewsQualityRouter.get('/dpmu/indicator', qualityFamilyController.dpmuIndicator);

viewsQualityRouter.get('/input/origin/team', qualityFamilyController.InputOriginTeam);

viewsQualityRouter.get('/model/dpmu/indicator', qualityFamilyController.ModeldpmuIndicator);

export default viewsQualityRouter;
