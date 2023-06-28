import {Dispatch} from "../scripts/utils/store";
import {AppState} from "../scripts/store";
import {authAPI} from "../scripts/api/auth";
import {hasError} from "../scripts/utils/apiHasError";
import {transformUser} from "../scripts/utils/apiTransformers";
import {UserDTO} from "../scripts/api/types";
import {router} from "../router";

type LoginPayload = {
    login: string;
    password: string;
};
type SignupPayload = {
    "first_name": "string",
    "second_name": "string",
    "login": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
};

// @ts-ignore
export const login = async (dispatch: Dispatch<AppState>, state: AppState, action: LoginPayload,) => {
    // dispatch({ isLoading: true });

    const response = await authAPI.login(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, Error: response?.reason });
        return;
    }

    const responseUser = await authAPI.me();

    dispatch({ isLoading: false, Error: null });

    if (hasError(responseUser)) {
        dispatch(logout);
        return;
    }

    // @ts-ignore
    dispatch({ user: transformUser(responseUser as UserDTO) });

    router.go('/messenger');

};

export const logout = async (dispatch: Dispatch<AppState>) => {

    await authAPI.logout();

    dispatch({ user: null });

    router.go('/');
};

// @ts-ignore
export const signup = async (dispatch: Dispatch<AppState>, state: AppState, action: SignupPayload) => {

    const response = await authAPI.signup(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, Error: response?.reason });
        return;
    }

    const responseUser = await authAPI.me();

    dispatch({ isLoading: false, Error: null });

    if (hasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseUser as unknown as UserDTO) });

    router.go('/messenger');
};
