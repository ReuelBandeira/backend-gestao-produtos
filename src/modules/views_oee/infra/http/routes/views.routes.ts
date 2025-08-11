import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import  DowtimeRankingOpController from '../controllers/DowtimeRankingOpController';
import DowtimeRankingTeamController from '../controllers/DowtimeRankingTeamController';
import ListOrderProductHourController from '../controllers/ListOrderProductHourController';
import AvailabilityPoLastThreeHourController from '../controllers/AvailabilityPoLastThreeHourController';
import ListOrderProductTeamController from '../controllers/ListOrderProductTeamController';
import ListOrderProductOeeCurrentWeekController from '../controllers/ListOrderProductOeeCurrentWeekController';
import ListOrderProductController from '../controllers/ListOrderProductController';
import HourlyProductionController from '../controllers/HourlyProductionController';
import QuantityCurrentOrderController from '../controllers/QuantityCurrentOrderController';
import StatusCurrentOrderController from '../controllers/StatusCurrentOrderController';
import HourlyProductionDetailController from '../controllers/HourlyProductionDetailController';


const ViewsRouter = Router();

const dowtimeRankingOpController = new  DowtimeRankingOpController();
const dowtimeRankingTeamController = new  DowtimeRankingTeamController();
const listPoHoursController = new  ListOrderProductHourController();
const availabilityPoLastThreeHourController = new  AvailabilityPoLastThreeHourController();
const listOrderProductTeamController = new  ListOrderProductTeamController();
const listOrderProductOeeCurrentWeekController = new  ListOrderProductOeeCurrentWeekController();
const listOrderProductController = new ListOrderProductController();
const hourlyProductionController = new HourlyProductionController();
const quantityCurrentOrderController = new QuantityCurrentOrderController();
const statusCurrentOrderController = new StatusCurrentOrderController();
const hourlyProductionDetailController = new HourlyProductionDetailController();


ViewsRouter.use(ensureAuthenticated);

// rotas doentime ranking op
ViewsRouter.get('/id-line/downtime', dowtimeRankingOpController.findViewsIdDowntimeRanking);
ViewsRouter.get('/all/downtime/rankingOp', dowtimeRankingOpController.allDowntimeRanking);

// rotas doentime ranking team
ViewsRouter.get('/ranking/dowtime/team/id-line', dowtimeRankingTeamController.findDowtimeRankingTeamLine);
ViewsRouter.get('/ranking/dowtime/team/all', dowtimeRankingTeamController.allDowtimeRankingTeam);

// rotas list_order_product_hour
ViewsRouter.get('/list/po-hours/id-line', listPoHoursController.findLinesPoHours);
ViewsRouter.get('/list/po-hours/all', listPoHoursController.allPoListHours);

// rotas list_order_product_hour
ViewsRouter.get('/availability/po/three-hour/id-line', availabilityPoLastThreeHourController.findLinesAvailabilityPoLastThreeHour);
ViewsRouter.get('/availability/po/three-hour/all', availabilityPoLastThreeHourController.allPoListHours);

// rotas vw_list_order_product_team
ViewsRouter.get('/list/order/product-team/id-line', listOrderProductTeamController.findLinesListOrderProductTeam);
ViewsRouter.get('/list/order/product-team/all', listOrderProductTeamController.allListOrderProductTeam);

// rotas vw_list_order_product_oee_current_week
ViewsRouter.get('/list/order/product-oee/current-week/id-line', listOrderProductOeeCurrentWeekController.findLinesListOrderProductOeeCurrentWeek);

// rotas vw_list_order_product
ViewsRouter.get('/list/order/product/id-line', listOrderProductController.findLinesListOrderProduct);

// rotas antigas
ViewsRouter.post('/list/hourly/po/id-line', hourlyProductionController.findLinesHourlyProduction);
ViewsRouter.get('/all/hourly-po/data-modified/lines', hourlyProductionController.allLines);
ViewsRouter.get('/all/lines/registers/oee', hourlyProductionController.allLinesOEERegisters);

// rotas novas
ViewsRouter.get('/all/lines/registers/oee/targets', hourlyProductionController.allLinesOEERegistersTarget);
ViewsRouter.post('/multiple/lines/registers/oee/targets', hourlyProductionController.multipleLinesOEERegistersTarget);
// monitor de produtividade
ViewsRouter.get('/line/registers/oee/targets', hourlyProductionController.lineOEERegistersTarget);




ViewsRouter.get('/all/quantity/current/order', quantityCurrentOrderController.allQuantityCurrentOrder);
ViewsRouter.get('/line/quantity/current/order', quantityCurrentOrderController.lineQuantityCurrentOrder);


ViewsRouter.post('/status/current/order', statusCurrentOrderController.findLinesStatusCurrentOrder);
ViewsRouter.get('/all/status/current/order', statusCurrentOrderController.allLinesStatusCurrentOrder);


// ViewsRouter.post('/list/hourly/po/id-line', hourlyProductionController.findLinesHourlyProduction);
// ViewsRouter.get('/all/hourly-po/data-modified/lines', hourlyProductionController.allLines);
ViewsRouter.get('/all/lines/registers/oee/detail', hourlyProductionDetailController.allLinesOEEDetailRegisters);



export default ViewsRouter;
