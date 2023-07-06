import {HTTPTransport} from "../utils/HTTPTransport";
import {BASE_URL} from "../constant";

type CreateChatRequestData = {
    title: string;
};
type DeleteChatRequestData = {
    chatId: string;
};
type GetUserTokenRequestData = {
    chatId: string;
};
type ArchiveChatByChatIdRequestData = {
    chatId: string;
};
type UnArchiveChatByChatIdRequestData = {
    chatId: string;
};
type AddUserToChatRequestData = {
    data: userData
};
type GetChatUsersRequestData = {
    chatId: string
};

type userData = {
    users: Array<string>;
    chatId: string;
}

const API_ENDPOINT = BASE_URL + 'chats'
const request = new HTTPTransport(API_ENDPOINT);
const options = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
};

export const chatAPI = {
    createChat: (data: CreateChatRequestData) => request.post('', {...options, ...data}),
    deleteChat: (data: DeleteChatRequestData) => request.delete('', {...options, ...data}),
    addUserToChat: (data: AddUserToChatRequestData) => request.put('/users', {...options, ...data}),
    deleteUserFromChat: (data: AddUserToChatRequestData) => request.delete('/users', {...options, ...data}),
    getAllChats: (chatsOffset?: number) => request.get('', {...options, data:{offset: chatsOffset}}),
    getChatUsers: (data:GetChatUsersRequestData) => request.get(`/${data.chatId}/users`, {...options}),
    getChatToken: (data: GetUserTokenRequestData) => request.post('/token/' + data.chatId, {...options}),
    archiveChatByChatId: (data: ArchiveChatByChatIdRequestData) => request.post('/archive',{...options, ...data}),
    unArchiveChatByChatId: (data: UnArchiveChatByChatIdRequestData) => request.post('/unarchive', {...options, ...data}),

};

