import Axios, { AxiosInstance } from 'axios';

export interface IAxiosServiceFactory {
  create(): AxiosInstance;
}

export class AxiosFactory implements IAxiosServiceFactory {
  create(): AxiosInstance {
    return Axios.create({
      baseURL: `${origin}/api/v1`,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
  }
}
