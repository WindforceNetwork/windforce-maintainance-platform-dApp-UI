import { Api } from './api';

export interface Service {
  endpoint: string,
  apis: Array<Api>
}
