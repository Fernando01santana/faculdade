export class GetAddress {
  async getAddressByCep(cep: string): Promise<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
