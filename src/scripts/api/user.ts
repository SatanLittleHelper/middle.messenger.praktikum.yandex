/* eslint-disable import/extensions,import/no-unresolved */
import { HTTPTransport } from '../utils/HTTPTransport';
import { BASE_URL } from '../constant';

type ProfileRequestData = {
    'first_name': 'string',
    'second_name': 'string',
    'display_name': 'string',
    'login': 'string',
    'email': 'string',
    'phone': 'string'
};
type AvatarRequestData = {
    avatar: FormData,
};
type ChangePasswordRequestData = {
    'oldPassword': 'string',
    'newPassword': 'string'
};

type SearchUserByLoginRequestData = {
    login: string;
};
type GetUserByIdRequestData = {
    id: string;
};

const API_ENDPOINT = `${BASE_URL}user/`;
const request = new HTTPTransport(API_ENDPOINT);
const options = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// eslint-disable-next-line import/prefer-default-export
export const userAPI = {
  editProfile: (data: ProfileRequestData) => request.put('profile', { ...options, ...data }),
  changePassword: (data: ChangePasswordRequestData) => request.put('password', {
    ...options,
    ...data,
  }),
  // @ts-ignore
  changeAvatar: (data: AvatarRequestData) => request.put('profile/avatar', { ...data }),
  searchUserByLogin: (data: SearchUserByLoginRequestData) => request.post('search', {
    ...options,
    ...data,
  }),
  getUserById: (data: GetUserByIdRequestData) => request.get('', { ...options, ...data }),
};
