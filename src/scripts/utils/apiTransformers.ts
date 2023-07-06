import { UserDTO } from '../api/types';

export type User = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export const transformUser = (data: UserDTO): User => {
    return {
        id: data.id,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
    };
};
