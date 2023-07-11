type SocketRequestData = {
    token: string
    userId: string,
    chatId: string
};

const API_ENDPOINT = 'wss://ya-praktikum.tech/ws/chats/';

// eslint-disable-next-line import/prefer-default-export
export const socketAPI = {
  // eslint-disable-next-line no-undef
  open: (data: SocketRequestData) => new WebSocket(
    `${API_ENDPOINT}${data.userId}/${data.chatId}/${data.token}`,
  ),

};
