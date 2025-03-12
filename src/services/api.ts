import { User } from '../models/user';

const BASE_URL = 'https://interviews-accounts.elevateapp.com/api/ui';
const USER_ID = '283';
const AUTH_TOKEN = 'o7sw2ZQDeBMPqyS-TyFi';

export const fetchUserIds = async (): Promise<number[]> => {
  const url = `${BASE_URL}/users?authentication_user_id=${USER_ID}&authentication_token=${AUTH_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.user_ids as number[];
};

export const getUserById = async (id: string): Promise<User> => {
  const url = `${BASE_URL}/users/${id}?authentication_user_id=${USER_ID}&authentication_token=${AUTH_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();
  return data as User;
};
