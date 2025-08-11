import { CreateSlackDownTimeDTO } from '@modules/messenger/dtos/CreateSlackDownTimeDTO';

export default function layoutSlackDownTime(data: CreateSlackDownTimeDTO) {
  return {
    blocks: [
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url:
              'https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png',
            alt_text: 'notifications warning icon',
          },
          {
            type: 'mrkdwn',
            text: `*[${data.id}] ALERTA DE DOWNTIME*`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `🚨 Downtime ocorrendo na linha 📌 *${data.line}* pelo motivo 🏷️ *${data.reason}* as 📆 *${data.stop_date}* com o 🆔 ID ${data.id}.`,
          },
          {
            type: 'mrkdwn',
            text: `Informações adicionais:`,
          },
          {
            type: 'mrkdwn',
            text: `*⚙️Máquina:*\n${data.machine}`,
          },
          {
            type: 'mrkdwn',
            text: `*🔍Modulo:*\n${data.module}`,
          },

          {
            type: 'mrkdwn',
            text: `*🧾Material/Insumo:*\n${data.material}`,
          },
          {
            type: 'mrkdwn',
            text: `*👤Usuário:*\n${data.employee}`,
          },
        ],
      },
      {
        type: 'divider',
      },
    ],
  };
}
