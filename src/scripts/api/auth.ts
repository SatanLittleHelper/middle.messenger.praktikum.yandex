import {HTTPTransport} from "../utils/HTTPTransport";

type LoginRequestData = {
    login: string;
    password: string;
};
type SignupRequestData = {
    "first_name": "string",
    "second_name": "string",
    "login": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
};

const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/'
const request = new HTTPTransport(API_ENDPOINT);
const options = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
};

export const authAPI = {
    login: (data: LoginRequestData) => request.post('signin', {...options, ...data}),

    me: () => request.get('user'),

    logout: () => request.post('logout'),

    signup: (data: SignupRequestData) => request.post( 'signup', {...options, ...data}),
};

