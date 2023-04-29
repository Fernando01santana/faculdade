import StringToDate from './stringToDate';

describe('StringToDate', () => {
  let stringToDate: StringToDate;

  beforeEach(() => {
    stringToDate = new StringToDate();
  });

  it('should convert a valid string date to Date object', () => {
    const dateString = '29/04/2023';
    const dateObject = stringToDate.convert(dateString);

    expect(dateObject).toBeInstanceOf(Date);
    expect(dateObject.getDate()).toEqual(29);
    expect(dateObject.getMonth()).toEqual(3);
    expect(dateObject.getFullYear()).toEqual(2023);
  });

  it('should throw an error when given an invalid string date', () => {
    const stringToDate = new StringToDate();
    const dateString = '2023-04-29'; // invalid format
    try {
      stringToDate.convert(dateString);
      // Se chegar aqui, o teste falhou porque não houve exceção
      fail('Expected exception to be thrown');
    } catch (e) {
      // Se chegar aqui, o teste passou
      expect(e).toBeInstanceOf(Error);
    }
  });
});
