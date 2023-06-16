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

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload,
) => {
    // dispatch({ isLoading: true });

    const response = await authAPI.login(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseUser = await authAPI.me();

    dispatch({ isLoading: false, loginFormError: null });

    if (hasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });

    router.go('/messenger');
};

export const logout = async (dispatch: Dispatch<AppState>) => {

    await authAPI.logout();

    dispatch({ user: null });

    router.go('/login');
};
