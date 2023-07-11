/* eslint-disable import/extensions,import/no-unresolved */
import { Dispatch } from '../scripts/utils/store';
import { AppState } from '../scripts/store';
import { authAPI } from '../scripts/api/auth';
import { hasError } from '../scripts/utils/apiHasError';
import { transformUser } from '../scripts/utils/apiTransformers';
import { UserDTO } from '../scripts/api/types';
import { router } from '../router';
import { userAPI } from '../scripts/api/user';

type ProfilePayload = {
    'first_name': 'string',
    'second_name': 'string',
    'display_name': 'string',
    'login': 'string',
    'email': 'string',
    'phone': 'string'
};
type AvatarPayload = {
    avatar: FormData,
};
type ChangePasswordPayload = {
    'oldPassword': 'string',
    'newPassword': 'string'
};

type SearchUserByLoginPayload = {
    login: string;
};

export const editProfile = async (
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: ProfilePayload,
) => {
  // dispatch({ isLoading: true });

  const response = await userAPI.editProfile(action);
  if (hasError(response)) {
    dispatch({
      isLoading: false,
      Error: response?.reason,
    });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({
    isLoading: false,
    Error: null,
  });

  if (hasError(responseUser)) {
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });
  window.store.dispatch({ profileState: 'profile' });

  router.go('/settings');
};
export const changePassword = async (
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: ChangePasswordPayload,
) => {
  // dispatch({ isLoading: true });

  const response = await userAPI.changePassword(action);
  if (hasError(response)) {
    dispatch({
      isLoading: false,
      Error: response?.reason,
    });
  } else {
    dispatch({
      isLoading: false,
      Error: null,
    });
    window.store.dispatch({ profileState: 'profile' });

    router.go('/settings');
  }
};
export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: AvatarPayload,
) => {
  // dispatch({ isLoading: true });

  const response = await userAPI.changeAvatar(action);
  if (hasError(response)) {
    dispatch({
      isLoading: false,
      Error: response?.reason,
    });
    return;
  }
  dispatch({
    isLoading: false,
    Error: null,
  });

  const responseUser = await authAPI.me();
  if (responseUser) {
    dispatch({ user: transformUser(responseUser as UserDTO) });
  }

  window.store.dispatch({ profileState: 'profile' });

  router.go('/settings');
};

export const findUserByLogin = async (
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: SearchUserByLoginPayload,
) => {
  const response = await userAPI.searchUserByLogin(action);
  if (hasError(response)) {
    dispatch({
      isLoading: false,
      Error: response?.reason,
    });
  }
};
