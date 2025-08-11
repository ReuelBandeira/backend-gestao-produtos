import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ScrapController from '../controllers/ScrapController';

const scrapRuter = Router();

const scrapController = new ScrapController();

scrapRuter.use(ensureAuthenticated);

scrapRuter.post('/', scrapController.create);
scrapRuter.get('/', scrapController.index);
scrapRuter.get('/all', scrapController.all);

export default scrapRuter;
