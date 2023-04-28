export default class StringToDate {
  convert(data: string): Date {
    const dateSplit = data.split('/');
    const dataFormtada = dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2];
    const stringDateToDate = new Date(dataFormtada);

    return stringDateToDate;
  }
}
