import {logout} from "../../../services/auth";
import {changeAvatar} from "../../../services/profile";
import {router} from "../../../router";

enum BUTTON_NAME {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    CHANGE_AVATAR = 'changeAvatar',
    UPLOAD_AVATAR = 'uploadAvatar',
    LOGOUT = 'logout',
    CANCEL = 'cancel',
}
export function handleButtonClick(buttonElement: HTMLButtonElement | null) {
    if (buttonElement?.name === BUTTON_NAME.EDIT_PROFILE) {
        window.store.dispatch({profileState: BUTTON_NAME.EDIT_PROFILE})
    }
    if (buttonElement?.name === BUTTON_NAME.CHANGE_PASSWORD) {
        window.store.dispatch({profileState: BUTTON_NAME.CHANGE_PASSWORD})
    }
    if (buttonElement?.name === BUTTON_NAME.LOGOUT) {
        window.store.dispatch(logout);
    }
    if (buttonElement?.name === BUTTON_NAME.CHANGE_AVATAR) {
        window.store.dispatch({profileState: BUTTON_NAME.CHANGE_AVATAR});
    }
    if (buttonElement?.name === BUTTON_NAME.CANCEL) {
        window.store.dispatch({profileState:''});
        router.go('/profile');
    }



}




