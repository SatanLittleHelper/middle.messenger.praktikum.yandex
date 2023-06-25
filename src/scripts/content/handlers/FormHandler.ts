import {login, signup} from "../../../services/auth";
import {FORM_NAME, MESSENGER_STATE} from "../../constant";
import {changeAvatar, changePassword, editProfile} from "../../../services/user";
import {createChat} from "../../../services/chat";
import getCurrentChatWebsocket from "../../utils/helpers/getCurrentChatWebsoket";


export function collectInputsData(event: any) {

    const inputs = { ...event.target?.querySelectorAll('input') };
    // @ts-ignore
    const data: Array<any> = Object.values(inputs).filter(item => item?.value || item?.files[0]);
    return Object.fromEntries(data.map((item) => [item?.name, item?.value || item?.files[0]?.file]));

     }

export function submitHandler(event: any) {
    switch (event.target.name) {
        case FORM_NAME.SIGN_IN:
            window.store.dispatch(login, {data: collectInputsData(event)});
            break
        case  FORM_NAME.SIGN_UP:
            window.store.dispatch(signup, {data: _prepareSignupData(collectInputsData(event))});
            break
        case FORM_NAME.EDIT_PROFILE:
            window.store.dispatch(editProfile, {data: collectInputsData(event)});
            break
        case FORM_NAME.CHANGE_PASSWORD:
            window.store.dispatch(changePassword, {data: collectInputsData(event)});
            break
        case FORM_NAME.CHANGE_AVATAR:
            window.store.dispatch(changeAvatar, {data: _prepareFormData(event.target)});
            break
        case FORM_NAME.ADD_USER:
            const messengerState = window.store.getState().messengerState;
            const inputData = collectInputsData(event);
                if (messengerState === MESSENGER_STATE.NEW_CHAT) {
                    window.store.dispatch(createChat, {data: {login: inputData.username, title: inputData.username}});
                    window.store.dispatch({messengerState: null})
                }
            break
        case FORM_NAME.MESSAGE:
            const ws = getCurrentChatWebsocket()
            const message = collectInputsData(event);
            ws!.send(JSON.stringify({content: message.message, type:"message"}));
            break
        default:
            break
    }
}

function _prepareSignupData(data: Record<string, any>) {
    delete data.repeat_password;
    return data
}

function _prepareFormData(form: HTMLFormElement) {
    return new FormData(form);
}
