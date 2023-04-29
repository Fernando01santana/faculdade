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
    const dateString = '2023-04-29'; // invalid format

    expect(() => stringToDate.convert(dateString)).toThrow(Error);
  });
});
