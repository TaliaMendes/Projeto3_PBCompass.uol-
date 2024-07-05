import axios from 'axios';
import { ICep } from '../interfaces/Cep.interface';

async function getAddressByCep(cep: string): Promise<ICep>{
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    const filterdAddress: ICep = {
      patio: response.data.logradouro || 'N/A',
      complement: response.data.complemento || 'N/A',
      neighborhood: response.data.bairro || 'N/A',
      locality: response.data.localidade || 'N/A',
      uf: response.data.uf || 'N/A',
    };

    return filterdAddress;
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    throw error;
  }
}

export default getAddressByCep;