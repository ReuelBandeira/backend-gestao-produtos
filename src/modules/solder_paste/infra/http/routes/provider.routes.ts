import ensureAuthenticated from '@modules/employee/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import ProviderController from '../controllers/ProviderController';
import SolderPasteController from '../controllers/SolderPasteController';
import SolderPasteControllController from '../controllers/SolderPasteControllController';

import ConfirgureSolderPasteTimeController from '../controllers/ConfirgureSolderPasteTimeController'
import SolderPasteMixerController from '../controllers/SolderPasteMixerController';



const providerRouter = Router();
const providerController = new ProviderController();
const solderPasteController = new SolderPasteController();
const solderPasteControllController = new SolderPasteControllController();
const confirgureSolderPasteTimeController = new ConfirgureSolderPasteTimeController();
const solderPasteMixerController = new SolderPasteMixerController();

providerRouter.use(ensureAuthenticated);

providerRouter.post('/', solderPasteController.create);
providerRouter.get('/last-serial', solderPasteController.listSerialQuantitySupplierTypePaste);
providerRouter.post('/f', solderPasteControllController.create);
providerRouter.put('/freezer/:serial_paste', solderPasteControllController.updateDateTimeFreezer);
providerRouter.put('/un-freezer/:serial_paste', solderPasteControllController.updateDateTimeUnFreezer);
providerRouter.put('/use/:serial_paste', solderPasteControllController.updateDateTimeUse);
providerRouter.get('/freezer', solderPasteControllController.indexSolderPasteControllFreezer);
providerRouter.get('/un-freezer', solderPasteControllController.indexSolderPasteControllUnFreezer);
providerRouter.get('/use', solderPasteControllController.indexSolderPasteControllUse);
providerRouter.get('/provider/name', solderPasteControllController.findNameProvider);
providerRouter.get('/search/history', solderPasteControllController.search_hitory_sn);
providerRouter.get('/history/provider/freezer', solderPasteControllController.history_provider_freezer);
providerRouter.get('/label/generation', solderPasteControllController.indexGeneratedLabel);
providerRouter.get('/delete/paste', solderPasteControllController.delete_paste);
providerRouter.get('/history/provider/unfreezer', solderPasteControllController.history_provider_unfreezer);
providerRouter.get('/history/provider/label_generation', solderPasteControllController.history_provider_label_generation);
providerRouter.get('/date/history/paste', solderPasteControllController.history_soder_dates);
providerRouter.get('/history/day/date', solderPasteControllController.history_soder_day_filter);
providerRouter.get('/time/day/config', solderPasteControllController.time_config);
providerRouter.get('/unfreezer/total', solderPasteControllController.indexUnFreezerTotal);
providerRouter.get('/lower_freezer/paste', solderPasteControllController.command_low_solder_paste);
providerRouter.get('/return/report/paste', solderPasteControllController.solder_paste_return_report);
providerRouter.get('/discarded/report/paste', solderPasteControllController.discarded_report_solder_paste);
providerRouter.get('/low/report/paste', solderPasteControllController.low_report_solder_paste);



providerRouter.post('/configure-solder-paste', confirgureSolderPasteTimeController.create);
providerRouter.get('/configure-solder-paste', confirgureSolderPasteTimeController.index);
providerRouter.delete('/configure-solder-paste/:id', confirgureSolderPasteTimeController.delete);

providerRouter.get('/use/:serial_paste', solderPasteControllController.findBySerialUse);
// Provider daqui para baixo

providerRouter.post('/provider', providerController.create);
providerRouter.get('/provider', providerController.index);
providerRouter.get('/provider/search', providerController.show);
providerRouter.put('/provider/:id', providerController.update);
providerRouter.delete('/provider/:id', providerController.delete);
providerRouter.get('/provider/provider-filter', providerController.indexAllFilter);
providerRouter.get('/provider/list-provider', providerController.listProvider);
providerRouter.get('/provider/:id', providerController.listProviderSelect);

providerRouter.post('/mixer/input/paste/register', solderPasteMixerController.create);
providerRouter.get('/mixer/list/registers', solderPasteMixerController.index);
providerRouter.get('/mixer/list', solderPasteMixerController.listSolderPasteMixer);
providerRouter.put('/mixer/registers/serial', solderPasteMixerController.update);
providerRouter.delete('/mixer/registers/:id', solderPasteMixerController.delete);
providerRouter.get('/mixer/registers/filter', solderPasteMixerController.show);

export default providerRouter;
