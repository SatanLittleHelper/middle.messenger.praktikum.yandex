import {HTTPTransport} from "../utils/HTTPTransport";

type CreateChatRequestData = {
    title: string;
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
    users: Array<Record<string, any>>;
    chatId: string;
};

const API_ENDPOINT = 'https://ya-praktikum.tech/api/v2/chats'
const request = new HTTPTransport(API_ENDPOINT);
const options = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
};

export const chatAPI = {
    createChat: (data: CreateChatRequestData) => request.post('', {...options, ...data}),
    addUserToChat: (data: AddUserToChatRequestData) => request.put('/users', {...options, ...data}),
    deleteUserUserFromChat: (data: AddUserToChatRequestData) => request.delete('/users', {...options, ...data}),
    getAllChats: (chatsOffset?: number) => request.get('', {...options, data:{offset: chatsOffset}}),
    getChatToken: (data: GetUserTokenRequestData) => request.post('/token/' + data.chatId, {...options}),
    archiveChatByChatId: (data: ArchiveChatByChatIdRequestData) => request.post('/archive',{...options, ...data}),
    unArchiveChatByChatId: (data: UnArchiveChatByChatIdRequestData) => request.post('/unarchive', {...options, ...data}),

};

