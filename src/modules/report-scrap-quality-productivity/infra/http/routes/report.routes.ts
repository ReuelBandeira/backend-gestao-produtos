import { Router } from "express";
import ensureAuthenticated from "@modules/employee/infra/http/middlewares/ensureAuthenticate";
import reportController from "../controllers/reportController";

const reportRouter = Router();

// eslint-disable-next-line new-cap
const reportcontroller = new reportController();

reportRouter.use(ensureAuthenticated);
reportRouter.get('/filter', reportcontroller.findFilter)


export default reportRouter
