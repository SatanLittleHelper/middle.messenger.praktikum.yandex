
type SocketRequestData = {
    token: string
    userId: string,
    chatId: string
}


const API_ENDPOINT = 'wss://ya-praktikum.tech/ws/chats/'

export const socketAPI = {
    open: (data: SocketRequestData) => new WebSocket(API_ENDPOINT + `${data.userId}/${data.chatId}/${data.token}`),

};

