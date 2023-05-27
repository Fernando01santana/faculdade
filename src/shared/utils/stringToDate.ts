export default class StringToDate {
  convert(data: string): Date {
    try {
      console.log(data);

      const dateSplit = data.split('/');
      const dataFormtada =
        dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2];
      const stringDateToDate = new Date(dataFormtada);

      return stringDateToDate;
    } catch (error) {
      throw new Error('Erro ao converter: ' + error.message);
    }
  }
}
