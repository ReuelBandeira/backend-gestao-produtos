import { injectable } from 'tsyringe';
import nodemailer from 'nodemailer';
import path, { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';

interface IMessage {
  to: string[];
  subject: string;
  context?: {
    title: string;
    content: string;
  };
}

@injectable()
export default class SendEmailService {
  async execute(message: IMessage): Promise<any> {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure:true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const viewPath = resolve(__dirname, '..', 'views', 'emails', 'layouts');
    const emailTemplateSource = fs.readFileSync(
      path.join(viewPath, '/default.handlebars'),
      'utf8'
    );

    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template(message.context);

    const mailOptions ={
      from: 'GRUPO ICTS <basys@grupoicts.com.br>',
      to: message.to,
      subject: message.subject,
      html: htmlToSend,
    };

    // MODIFICAR EM PRODUÇÃO

    // eslint-disable-next-line func-names
    return transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return error
        }
          return info
    });

  }
}
