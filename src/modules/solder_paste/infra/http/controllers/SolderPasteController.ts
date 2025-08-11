/* eslint-disable radix */
import CreateSolderPasteService from '@modules/solder_paste/services/CreateSolderPasteService';
/* import DeleteProviderService from '@modules/solder_paste/services/DeleteProviderService';
import UpdateProviderService from '@modules/solder_paste/services/UpdateProviderService'; */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSolderPasteControllService from '@modules/solder_paste/services/CreateSolderPasteControllService';
import axios from 'axios';
import ProviderRepository from '../../typeorm/repositories/ProviderRepository';
import SolderPasteRepository from '../../typeorm/repositories/SolderPasteRepository';


/* import got from 'got';
 */
export default class SolderPasteController {

  public async listSerialQuantitySupplierTypePaste(request: Request, response: Response): Promise<Response> {

    const { id_provider, type_paste } = request.query;

    const solderPasteRepository = new SolderPasteRepository();

    const solderPasteSequential = await solderPasteRepository.listSerialQuantitySupplierTypePaste(id_provider, type_paste);

    const providerRepository = new ProviderRepository();

    const provider = await providerRepository.findById(id_provider);

    const serial = provider.acronym+String(solderPasteSequential[0]?.sequential).padStart(8, "0");

    if(typeof solderPasteSequential[0]?.sequential !== 'undefined'){
      const result = {
        serial,
        sequential: solderPasteSequential[0]?.sequential,
        id_provider,
        type_paste
      }
      return response.json(result);
    }
      return response.json();

  }


  public async create(request: Request, response: Response): Promise<Response> {

    const {
      id_provider,
      quantity,
      type_paste,
      expiration_date,
      manufacturing_date,
      lot_number,
      weight,
    } = request.body;

    const arraySerial = [];

    const { id: id_employee } = request.user;

    const solderPaste = container.resolve(CreateSolderPasteService);

    const solderPasteExc = await solderPaste.execute({
      id_provider,
      id_employee,
      quantity,
      type_paste,
    });

    const providerRepository = new ProviderRepository();
    const solderPasteRepository = new SolderPasteRepository();

    const provider = await providerRepository.findById(id_provider);

    const solderPasteControl = container.resolve(CreateSolderPasteControllService);
    const solderPasteSequential = await solderPasteRepository.listSerialQuantitySupplierTypePaste(id_provider, type_paste);

    for( let i = 1; i <= quantity; i++){

      const sequential = (Number(solderPasteSequential[0]?.sequential)+i) - quantity;

      const serial = String(provider.acronym+String(sequential).padStart(8, "0"));

      const providerControl = await solderPasteControl.execute({
        serial_paste: serial,
        datetime_freezer: null,
        datetime_unfreezer: null,
        datetime_use: null,
        status: "",
        id_employee,
        type_paste,
        id_provider,
        expiration_date,
        manufacturing_date,
        lot_number,
        weight,
      });

      const generatedSerials = {
        serial,
        data_cadastro: new Date(providerControl.datetime_label_printing).toLocaleString()
      }

      arraySerial.push(generatedSerials);
    }

    const body = {
      "serials": arraySerial
    }

    const res = await axios.post('http://10.105.103.32:8082/index.php/qr-code', body);
    const link = res.data;

    return response.status(201).json({solderPasteExc, link});
  }
}
