import {logout} from "../../../services/auth";

enum BUTTON_NAME {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    LOGOUT = 'logout',
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


}




