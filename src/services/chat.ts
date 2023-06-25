import {Dispatch} from "../scripts/utils/store";
import {AppState} from "../scripts/store";
import {hasError} from "../scripts/utils/apiHasError";
import {router} from "../router";
import {chatAPI} from "../scripts/api/chat";
import {userAPI} from "../scripts/api/user";
import {MESSENGER_STATE} from "../scripts/constant";

type CreateChatPayload = {
    title: string;
    data: Record<string, any>;
    login: string;
    chat_id: string

};
type AddUserToChatPayload = {
    data: Record<string, any>
    chatId: string,
    users: Array<Record<string, any>>

};
type GetUserTokenPayload = {
    chatId: string;
};
// @ts-ignore
export const createChat = async (dispatch: Dispatch<AppState>, state: AppState, action: CreateChatPayload,) => {
    // dispatch({ isLoading: true });
    const response = await chatAPI.createChat(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, Error: response?.reason });
        return;
    }
    const users: Array<Record<string, any>> = await userAPI.searchUserByLogin(action) as unknown as Array<Record<string, any>>;

    if (users.length === 0) {
        dispatch({ isLoading: false, Error: 'Can\'t find user', messengerState: MESSENGER_STATE.NEW_CHAT});
        return;
    }

    const userToAdd = users.filter(user => user.login === action.data.title)

    if (userToAdd.length === 0) {
        dispatch({ isLoading: false, Error: 'Can\'t find user', messengerState: MESSENGER_STATE.NEW_CHAT});
        return;
    }
    const userToAddId = userToAdd[0].id
    // @ts-ignore
    dispatch(addUserToChat, {data: {users: [userToAddId], chatId: response.id }});
    dispatch({ messengerState: null});

    router.go('/messenger');
};

// @ts-ignore
export const addUserToChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserToChatPayload,) => {
    dispatch({ messengerState: 'addUser'});

    const response = await chatAPI.addUserToChat(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, messengerState: null, Error: response?.reason });
        return;
    }

    dispatch({ messengerState: null});
    router.go('/messenger');

};
// @ts-ignore
export const deleteUserFromChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserToChatPayload,) => {
    dispatch({ messengerState: 'addUser'});

    const response = await chatAPI.deleteUserUserFromChat(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, messengerState: null, Error: response?.reason });
        return;
    }

    dispatch({ messengerState: null});

};
export const getAllChats = async (
    dispatch: Dispatch<AppState>,
) => {
    dispatch({isLoading: true})
    let chatsOffset = 0;
    let chats: Array<Record<string, any>> = [];

    const response: Array<Record<string, any>> = await chatAPI.getAllChats(chatsOffset) as unknown as Array<Record<string, any>>;
    if (response.length === 0) {
        dispatch({ isLoading: false, messengerState: null, Error: "All chats loaded" });
        return;
    }
    response.forEach((item) => chats?.push(item));
    dispatch({ chats: chats, chatsOffset: chatsOffset + 10});
    dispatch({isLoading: false})
};

export const getChatToken = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: GetUserTokenPayload,
) => {
    // dispatch({ isLoading: true });
    const response = await chatAPI.getChatToken(action) as Record<string, any>;
    if (hasError(response)) {
        dispatch({ isLoading: false, Error: response?.reason, ...state});
        return;
    }
    dispatch({currentChatToken: response.token})
};
