import { User } from "../utils/apiTransformers";

export interface AppState {
    loginFormError?: string | null;
    user?: User | null;
    appIsInited?: boolean;
    PageProps?: any;
}


export const defaultState: AppState = {
    loginFormError: null,
    user: null,
};

