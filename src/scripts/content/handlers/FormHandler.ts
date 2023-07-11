/* eslint-disable import/extensions,import/no-unresolved */
import { login, signup } from '../../../services/auth';
import { FORM_NAME, MESSENGER_STATE } from '../../constant';
import { changeAvatar, changePassword, editProfile } from '../../../services/user';
import { addUserToChat, createChat, deleteUserFromChat } from '../../../services/chat';
import getCurrentChatWebsocket from '../../utils/helpers/getCurrentChatWebsoket';

export function collectInputsData(event: any) {
  const inputs = { ...event.target?.querySelectorAll('input') };
  const data: Array<any> = Object.values(inputs)
  // @ts-ignore
    ?.filter((item) => item?.value || item?.files[0]);
  return Object.fromEntries(data.map((item) => [item?.name, item?.value || item?.files[0]?.file]));
}

export function submitHandler(event: any) {
  const { messengerState } = window.store.getState();
  let inputData;

  switch (event.target.name) {
    case FORM_NAME.SIGN_IN:
      window.store.dispatch(login, { data: collectInputsData(event) });
      break;
    case FORM_NAME.SIGN_UP:
      window.store.dispatch(signup, { data: _prepareSignupData(collectInputsData(event)) });
      break;
    case FORM_NAME.EDIT_PROFILE:
      window.store.dispatch(editProfile, { data: collectInputsData(event) });
      break;
    case FORM_NAME.CHANGE_PASSWORD:
      window.store.dispatch(changePassword, { data: collectInputsData(event) });
      break;
    case FORM_NAME.CHANGE_AVATAR:
      window.store.dispatch(changeAvatar, { data: _prepareFormData(event.target) });
      break;
    case FORM_NAME.ADD_CHAT:
      inputData = collectInputsData(event);
      if (messengerState === MESSENGER_STATE.NEW_CHAT) {
        window.store.dispatch(createChat, { data: { title: inputData.newChatTitle } });
        window.store.dispatch({ messengerState: '' });
      }
      break;
    case FORM_NAME.ADD_USER:
      inputData = collectInputsData(event);
      if (messengerState === MESSENGER_STATE.ADD_USER) {
        window.store.dispatch(addUserToChat, { data: { login: inputData.login } });
        window.store.dispatch({ messengerState: '' });
      }
      break;
    case FORM_NAME.DELETE_USER:
      inputData = collectInputsData(event);
      if (messengerState === MESSENGER_STATE.DELETE_USER) {
        window.store.dispatch(deleteUserFromChat, { data: { login: inputData.login } });
        window.store.dispatch({ messengerState: '' });
      }
      break;
    case FORM_NAME.MESSAGE:
      const ws = getCurrentChatWebsocket();
      const message = collectInputsData(event);
      if (ws) {
                ws!.send(JSON.stringify({
                  content: message.message,
                  type: 'message',
                }));
      }
      break;
    default:
      break;
  }
}

function _prepareSignupData(data: Record<string, any>) {
  delete data.repeat_password;
  return data;
}

function _prepareFormData(form: HTMLFormElement) {
  return new FormData(form);
}
