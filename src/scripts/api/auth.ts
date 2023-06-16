import { APIError, UserDTO } from './types';
import {HTTPTransport} from "../utils/HTTPTransport";

type LoginRequestData = {
    login: string;
    password: string;
};

type LoginResponseData = {} | APIError;
const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2/'
const request = new HTTPTransport(API_ENDPOINT);
const options = {
    // credentials: 'include',
    // mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
};

export const authAPI = {
    login: (data: LoginRequestData) => request.post<LoginResponseData>('auth/signin', {...options, ...data}),

    me: () => request.get<UserDTO | APIError>('auth/user'),

    logout: () => request.post('auth/logout'),
};

