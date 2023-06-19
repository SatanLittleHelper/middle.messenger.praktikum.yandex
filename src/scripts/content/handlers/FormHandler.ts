import {login} from "../../../services/auth";
import {signup} from "../../../services/auth";
import {changeAvatar, changePassword, editProfile} from "../../../services/profile";

enum FORM_NAME {
    SIGNIN = 'signIn',
    SIGNUP = 'signup',
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    CHANGE_AVATAR = 'changeAvatar'
}
export function collectInputsData(event: any) {

        const inputs = { ...event.target?.querySelectorAll('input') };
        // @ts-ignore
        const data: Array<any> = Object.values(inputs).filter(item => item.value || item.files[0]);
        const result = Object.fromEntries(data.map((item) => [item.name, item.value || item.files[0].file]));
    console.log(result);

    return result;

     }

export function submitHandler(event: any) {
    if (event.target.name === FORM_NAME.SIGNIN) {
        window.store.dispatch(login, {data: collectInputsData(event)});
    }
    if (event.target.name === FORM_NAME.SIGNUP) {
        window.store.dispatch(signup, {data: _prepareSignupData(collectInputsData(event))});
    }
    if (event.target.name === FORM_NAME.EDIT_PROFILE) {
        window.store.dispatch(editProfile, {data: collectInputsData(event)});
    }
    if (event.target.name === FORM_NAME.CHANGE_PASSWORD) {
        window.store.dispatch(changePassword, {data: collectInputsData(event)});
    }
    if (event.target.name === FORM_NAME.CHANGE_AVATAR) {
        window.store.dispatch(changeAvatar, {data: _prepareFormData(event.target)});
    }
}

function _prepareSignupData(data: Record<string, any>) {
    delete data.repeat_password;
    return data
}

function _prepareFormData(form: HTMLFormElement) {
    const avatar = new FormData(form)
    return avatar;
}
