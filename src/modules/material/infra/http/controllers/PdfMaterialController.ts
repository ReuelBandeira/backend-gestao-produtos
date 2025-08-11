import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

import path from 'path';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { MaterialManagerRepository } from '../../typeorm/repositories/MaterialManagerRepository';

export default class PdfMaterialManagerController {
  public async index(request: Request, response: Response): Promise<void> {
    const { list_code } = request.params;

    const filePath = path.join(
      __dirname,
      '../../../providers/template/material_manager.ejs'
    );

    const productRepository = new ProductRepository();
    const materialRepository = new MaterialManagerRepository();

    const findListCode = await materialRepository.findDetailsToPdfByListCode(
      list_code
    );

    const productDescription = await productRepository.findByProductName(
      findListCode[0].struct_code
    );

    const material = {
      findListCode,
      product: {
        name: findListCode[0].struct_code,
        description: productDescription?.description,
      },
    };

    ejs.renderFile(
      filePath,
      { material, server: process.env.SERVER },
      (err, html) => {
        if (err) {
          console.log(err);
          throw new AppError('Erro na leitura do arquivo');
        }
        return response.send(html);
      }
    );
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.params;
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome',
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(`http://localhost:3334/material/render/${list_code}`, {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      printBackground: true,
    });

    await browser.close();

    response.contentType('application/pdf');

    return response.status(201).send(pdf);
  }
}
