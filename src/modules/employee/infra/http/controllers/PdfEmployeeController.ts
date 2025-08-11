import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

import path from 'path';
import ejs from 'ejs';
import puppeteer from 'puppeteer';

export default class PdfEmployeeManagerController {
  public async index(request: Request, response: Response): Promise<void> {
    const { user, password } = request.query;

    const filePath = path.join(
      __dirname,
      '../../../providers/template/employee_manager.ejs'
    );

    const employee = {
      user,
      password,
    };

    ejs.renderFile(
      filePath,
      { employee, server: process.env.SERVER },
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
    const { user, password } = request.query;
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(
      `http://localhost:3334/employees/render/employee?user=${user}&password=${password}`,
      {
        waitUntil: 'networkidle0',
      }
    );

    const pdf = await page.pdf({
      printBackground: true,
    });

    await browser.close();

    response.contentType('application/pdf');

    return response.status(201).send(pdf);
  }
}
