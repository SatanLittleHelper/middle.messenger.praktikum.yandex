import {logout} from "../../../services/auth";
import {router} from "../../../router";
import {BUTTON_NAME} from "../../constant";

export function handleButtonClick(buttonElement: HTMLButtonElement | null) {
    switch (buttonElement?.name) {
        case BUTTON_NAME.EDIT_PROFILE:
            window.store.dispatch({profileState: BUTTON_NAME.EDIT_PROFILE})
            break
        case BUTTON_NAME.CHANGE_PASSWORD:
            window.store.dispatch({profileState: BUTTON_NAME.CHANGE_PASSWORD})
            break
        case BUTTON_NAME.LOGOUT:
            window.store.dispatch(logout);
            break
        case BUTTON_NAME.CHANGE_AVATAR:
            window.store.dispatch({profileState: BUTTON_NAME.CHANGE_AVATAR});
            break
        case BUTTON_NAME.NEW_CHAT:
            window.store.dispatch({messengerState:BUTTON_NAME.NEW_CHAT});
            break
        case BUTTON_NAME.DELETE_CHAT:
            window.store.dispatch({messengerState:BUTTON_NAME.DELETE_CHAT});
            break
        case BUTTON_NAME.ADD_USER:
            window.store.dispatch({messengerState:BUTTON_NAME.ADD_USER});
            break
        case BUTTON_NAME.DELETE_USER:
            window.store.dispatch({messengerState:BUTTON_NAME.DELETE_USER});
            break
        case BUTTON_NAME.OPEN_PROFILE:
            router.go('/settings');
            break
        case BUTTON_NAME.CANCEL:
            window.store.dispatch({profileState:''});
            router.go('/settings');
            break
        case BUTTON_NAME.BACK:
            router.go('/')
            break
        case BUTTON_NAME.DIALOG:
            if (window.store.getState()?.currentChatId !== buttonElement?.id) {
                window.store.dispatch({messengerState:'openChat', currentChatId: buttonElement?.id});
            }
            break
        case BUTTON_NAME.POPUP_HEADER_OPEN:
            window.store.dispatch({messengerState:BUTTON_NAME.POPUP_HEADER_OPEN});
            break
        default:

    }

}




