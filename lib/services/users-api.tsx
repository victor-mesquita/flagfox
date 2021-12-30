import { AxiosResponse } from 'Axios';
import { Api } from './api-core/api';
import { User } from './users-api.types';

export class UsersApi extends Api {
  BASE_ENDPOINT = '/users';

  async create(user: User): Promise<User | null> {
    const response: AxiosResponse<any> = await this.http.post(
      `${this.BASE_ENDPOINT}`,
      user
    );

    if (response.status !== 200) return null;

    return response.data;
  }
}
