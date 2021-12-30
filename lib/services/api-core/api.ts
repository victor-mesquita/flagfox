import axios, { AxiosInstance } from 'axios';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';

export abstract class Api {
  http: AxiosInstance;
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;

    this.http = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        'content-type': 'application/json; charset=utf-8 '
      }
    });
  }
}
