import {Dispatch} from "../scripts/utils/store";
import {AppState} from "../scripts/store";
import {hasError} from "../scripts/utils/apiHasError";
import {chatAPI} from "../scripts/api/chat";
import {userAPI} from "../scripts/api/user";
import {startWebsocket} from "./socket";

type CreateChatPayload = {
    title: string;
    data: Record<string, any>;

};
type deleteChatPayload = {
    chatId: string;
};
type AddUserToChatPayload = {
    data: Record<string, any>,
    login: string,

};
type GetUserTokenPayload = {
    chatId: string;
};
// @ts-ignore
export const createChat = async (dispatch: Dispatch<AppState>, state: AppState, action: CreateChatPayload,) => {
    // dispatch({ isLoading: true });
    const response = await chatAPI.createChat(action);
    console.log(response)
    if (hasError(response)) {
        dispatch({ isLoading: false, Error: response?.reason, messengerState: '' });
        return;
    }
    // @ts-ignore
    dispatch(startWebsocket,{chatId: response?.id})
    // @ts-ignore
    dispatch({currentChatId: response.id, currentChatMessages: []})
    dispatch(getAllChats)
};
// @ts-ignore
export const deleteChat = async (dispatch: Dispatch<AppState>, state: AppState, action: deleteChatPayload,) => {
    // dispatch({ isLoading: true });
    const response = await chatAPI.deleteChat(action);
    if (hasError(response)) {
        dispatch({ isLoading: false, Error: response?.reason, messengerState: '' });
        return;
    }
    dispatch({currentChatId: undefined, currentChatMessages: []})
    dispatch(getAllChats)
};

// @ts-ignore
export const addUserToChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserToChatPayload,) => {
    const chatId = window.store.getState().currentChatId;
    const users: Array<Record<string, any>> = await userAPI.searchUserByLogin(action) as unknown as Array<Record<string, any>>;

    if (users.length === 0 ) {
        dispatch({ isLoading: false, Error: 'Can\'t find user'});
        return;
    }

    if (hasError(users)) {
        dispatch({ isLoading: false, Error: users?.reason});
        return
    }

    const userToAdd = users.filter(user => user.login === action.data.login)

    if (userToAdd.length === 0) {
        dispatch({ isLoading: false, Error: 'Can\'t find user'});
        return;
    }
    const userToAddId = userToAdd[0].id
    // @ts-ignore
    const response = await chatAPI.addUserToChat({data: {users: [userToAddId], chatId: chatId}});
    if (hasError(response)) {
        dispatch({isLoading: false, Error: response?.reason});
    }

    await getChatUsers(chatId as string)
    dispatch({messengerState: ''})

};
// @ts-ignore
export const deleteUserFromChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserToChatPayload,) => {

    const chatId = window.store.getState().currentChatId;
    const currentChat = window.store.getState().chats?.filter((chat: Record<string, any>) => chat.id.toString() === chatId);


    if (currentChat.length > 0) {
        const userToDelete = currentChat[0].users.filter((user: Record<string, any>) => user.login === action.data.login);
            if (userToDelete.length === 0) {
                dispatch({Error: "Can\'t find user in chat", messengerState: ''})
                return;

            }
            const userToDeleteId: string = userToDelete[0].id;
            if (userToDeleteId) {
                const response = await chatAPI.deleteUserFromChat({data: {users: [userToDeleteId], chatId: chatId as string}});

                if (hasError(response)) {
                    dispatch({ isLoading: false, messengerState: null, Error: response?.reason });
                    return;
                }
            }

        await getChatUsers(chatId as string)
    }
    dispatch({messengerState: ''})

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
    dispatch({ chats: chats, chatsOffset: chatsOffset + 10, isLoading: false});

    for (const chat of chats) {
        await getChatUsers(chat.id);
    }

    dispatch({messengerState: ''})

};

async function getChatUsers(chatId: string) {
    const allChats = window.store.getState().chats;
    if (allChats?.length > 0) {
        const chat = allChats?.filter((chat: Record<string, any>) => chat.id == chatId)
        const response = await chatAPI.getChatUsers({chatId: chatId})
        chat[0].users = Object.values(response).filter((item) => item.id !== window.store.getState().user?.id);
    }


}

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
