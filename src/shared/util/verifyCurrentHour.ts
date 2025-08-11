export default function verifyCurrentHour(array: any) {
  const horaAtual = new Date();


  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < array.length; i++) {
    const turno = array[i];
    const startHourParts = turno.start_hour.split(':');
    const endHourParts = turno.end_hour.split(':');
    const startHour = new Date(horaAtual.getFullYear(), horaAtual.getMonth(), horaAtual.getDate(), startHourParts[0], startHourParts[1]);
    const endHour = new Date(horaAtual.getFullYear(), horaAtual.getMonth(), horaAtual.getDate(), endHourParts[0], endHourParts[1]);

    if (horaAtual >= startHour && horaAtual <= endHour) {
      return turno;
    }
  }

  return null; // Retorna null caso não seja encontrado nenhum turno correspondente à hora atual
}
