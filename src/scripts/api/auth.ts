import { APIError, UserDTO } from './types';
import {HTTPTransport} from "../utils/HTTPTransport";

type LoginRequestData = {
    login: string;
    password: string;
};

type LoginResponseData = {} | APIError;
const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2/'
const request = new HTTPTransport(API_ENDPOINT);

export const authAPI = {
    login: (data: LoginRequestData) =>

        request.post<LoginResponseData>('auth/signin', data),

    me: () => request.get<UserDTO | APIError>('auth/user'),

    logout: () => request.post('auth/logout'),
};
