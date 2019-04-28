import Axios, { AxiosInstance } from 'axios';

export interface IAxiosServiceFactory {
  create(): AxiosInstance;
}

interface UrlBuilderOptions {
  hostName?: string;
  port?: number | string;
  prefix?: string;
  apiVersion?: string;
}

function buildUrl({
  hostName, port, prefix, apiVersion
}: UrlBuilderOptions) {
  return `${hostName || 'localhost'}:${port || 7777}/${prefix || 'api'}/${apiVersion || 'v1'}`;
}

export class AxiosFactory implements IAxiosServiceFactory {
  create(): AxiosInstance {
    const url = buildUrl({ 
      hostName: process.env.API_NAME,
      port: process.env.API_PORT,
      prefix: process.env.API_PREFIX,
      apiVersion: process.env.API_VERSION
    });
    // const url = process.env.API_NAME && process.env.API_PORT
    //   ? `http://${process.env.API_NAME}:${process.env.API_PORT}`
    //   : 'http://localhost:7777';
    return Axios.create({
      baseURL: url,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
