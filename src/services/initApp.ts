import { authAPI } from '../scripts/api/auth';
import { UserDTO } from '../scripts/api/types';
import type { Dispatch } from '../scripts/utils/store';
import { hasError as apiHasError } from '../scripts/utils/apiHasError';
import { transformUser } from '../scripts/utils/apiTransformers';
import {AppState} from "../scripts/store";

export async function initApp(dispatch: Dispatch<AppState>) {

    // // Ручкая задержка для демонстрации загрузочного экрана
    // await new Promise(r => setTimeout(r, 700));

    try {

        const response = await authAPI.me();

        if (apiHasError(response)) {
            return;
        }

        dispatch({ user: transformUser(response as UserDTO) });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appIsInited: true });

    }
}
