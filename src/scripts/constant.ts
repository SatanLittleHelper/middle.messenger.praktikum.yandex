export const BASE_URL = 'https://ya-praktikum.tech/api/v2/';

// eslint-disable-next-line no-shadow
export enum USER {
    FIRST_NAME = 'first_name',
    DISPLAY_NAME = 'display_name',
    SECOND_NAME = 'second_name',
    PASSWORD = 'password',
    OLD_PASSWORD = 'oldPassword',
    NEW_PASSWORD = 'newPassword',
    REPEAT_PASSWORD = 'repeatPassword',
    LOGIN = 'login',
    PHONE = 'phone',
    EMAIL = 'email',
}

// eslint-disable-next-line no-shadow
export enum BUTTON_NAME {
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    CHANGE_AVATAR = 'changeAvatar',
    UPLOAD_AVATAR = 'uploadAvatar',
    LOGOUT = 'logout',
    CANCEL = 'cancel',
    NEW_CHAT = 'newChat',
    ADD_CHAT = 'addChat',
    ADD_USER = 'addUser',
    DELETE_USER = 'deleteUser',
    DELETE_CHAT = 'deleteChat',
    DIALOG = 'dialog',
    OPEN_PROFILE = 'openProfile',
    BACK = 'back',
    POPUP_HEADER_OPEN = 'popupHeaderOpen',
}

// eslint-disable-next-line no-shadow
export enum PROFILE_STATE {
    CHANGE_PASSWORD = 'changePassword',
    EDIT_PROFILE = 'editProfile',
    CHANGE_AVATAR = 'changeAvatar',

}

// eslint-disable-next-line no-shadow
export enum MESSENGER_STATE {
    IDLE = '',
    ADD_USER = 'addUser',
    DELETE_USER = 'deleteUser',
    NEW_CHAT = 'newChat',
    DELETE_CHAT = 'deleteChat',
    OPEN_CHAT = 'openChat',
    CHAT_OPENED = 'chatOpened',
    POPUP_HEADER_OPEN = 'popupHeaderOpen',

}

// eslint-disable-next-line no-shadow
export enum FORM_NAME {
    SIGN_IN = 'signIn',
    SIGN_UP = 'signup',
    EDIT_PROFILE = 'editProfile',
    CHANGE_PASSWORD = 'changePassword',
    CHANGE_AVATAR = 'changeAvatar',
    ADD_USER = 'addUser',
    DELETE_USER = 'deleteUser',
    ADD_CHAT = 'addChat',
    MESSAGE = 'message',

}
