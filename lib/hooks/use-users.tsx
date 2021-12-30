import fetcher from '../fetcher';
import { UsersApi } from '../services/users-api';
import useSwr from 'swr';
import { User } from '../services/users-api.types';

const userApi = new UsersApi();

export const useUsers = () => {
  const { data, error } = useSwr('/api/users/', fetcher);

  return {
    users: data,
    isLoading: !error && !data,
    error
  };
};

export const createUser = async (user: User) => {
  const response = await userApi.create(user);

  return response;
};
