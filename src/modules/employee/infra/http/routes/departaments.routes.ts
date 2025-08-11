import { Router } from 'express';

import DepartamentController from '../controllers/DepartamentController';

const departamentsRouter = Router();

const departamenteController = new DepartamentController();

departamentsRouter.get('/', departamenteController.index);

export default departamentsRouter;
