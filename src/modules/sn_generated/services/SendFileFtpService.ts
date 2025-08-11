import { injectable } from 'tsyringe';
import SFTPClient from 'ssh2-sftp-client'
import { ProductionOrder } from '@modules/production_orders/infra/typeorm/entities/ProductionOrders';
import SnGenerated from '../infra/typeorm/entities/SnGenerated';


@injectable()
export default class SndFileFtpService {
  async execute(txt: string, productionOrder: ProductionOrder): Promise<void> {
    // Configurações do servidor FTP
    const sftpConfig = {
      host: process.env.SFTP_HOST,
      user: process.env.SFTP_USER,
      password: process.env.SFTP_PASSWORD,
      port: Number(process.env.SFTP_PORT)
    };
    // Dados do arquivo a ser enviado
    const fileName = `${process.env.SFTP_PATH}/${productionOrder.mo_code}.txt`;
    const fileContent = txt;

    // Criação do arquivo em buffer
    const fileBuffer = Buffer.from(fileContent, 'utf8');

    const sftp = new SFTPClient();

    try {
      // Conexão ao servidor SFTP
      await sftp.connect(sftpConfig);
      console.log('Conexão SFTP estabelecida');
    } catch (error) {
      console.error('Erro ao estabelecer a conexão SFTP:', error);
      return; // Retorna imediatamente para interromper a execução do código
    }

    try {
      // Envio do arquivo
      await sftp.put(fileBuffer, fileName);
      console.log('Arquivo enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
    } finally {
      // Fecha a conexão SFTP
      sftp.end();
    }

  }
}
