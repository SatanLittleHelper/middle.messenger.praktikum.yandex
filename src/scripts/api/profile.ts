import { APIError } from './types';
import {HTTPTransport} from "../utils/HTTPTransport";

type ProfileRequestData = {
    "first_name": "string",
    "second_name": "string",
    "display_name": "string",
    "login": "string",
    "email": "string",
    "phone": "string"
};
type AvatarRequestData = {
    avatar: FormData,
};
type ChangePasswordRequestData = {
    "oldPassword": "string",
    "newPassword": "string"
};

type ProfileResponseData = {} | APIError;
type AvatarResponseData = {} | APIError;
type ChangePasswordResponseData = {} | APIError;
const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2/user/'
const request = new HTTPTransport(API_ENDPOINT);
const options = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
};

export const profileAPI = {
    editProfile: (data: ProfileRequestData) => request.put<ProfileResponseData>('profile', {...options, ...data}),
    changePassword: (data: ChangePasswordRequestData) => request.put<ChangePasswordResponseData>('password', {...options, ...data}),
    changeAvatar: (data: AvatarRequestData) => request.put<AvatarResponseData>('profile/avatar', {...data}),
};

