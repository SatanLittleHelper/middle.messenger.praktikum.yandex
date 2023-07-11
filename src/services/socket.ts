/* eslint-disable import/extensions,import/no-unresolved */
import { Dispatch } from '../scripts/utils/store';
import { AppState } from '../scripts/store';
import { socketAPI } from '../scripts/api/socket';
import { chatAPI } from '../scripts/api/chat';

type WebSocketPayload = {
    chatId: string,
    userId: string,
    token: string
};
type StartAllWebSocketPayload = {
    chats: Array<Record<string, any>>,
    userId: string,
};
type StartWebSocketPayload = {
    chatId: string
};

export const openWebSocket = async (
  // @ts-ignore
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: WebSocketPayload,
) => {
  let interval: NodeJS.Timer;
  const webSocket = await socketAPI.open(action);
  webSocket.onopen = () => {
    const ws = window.store.getState()?.ws;
    const wsObj: Record<string, WebSocket> = {} as Record<string, WebSocket>;
    wsObj[action.chatId] = webSocket;
        ws!.push(wsObj);
        window.store.dispatch({ ws });

        interval = setInterval(() => {
          console.log('ping');
          webSocket.send(JSON.stringify({ type: 'ping' }));
        }, 5000);
  };
  webSocket.onclose = (ev) => {
    console.log(ev.type);
    clearInterval(interval);
  };
  webSocket.onmessage = (ev) => {
    if (ev.data === 'WS token is not valid') {
      return;
    }
    if (JSON.parse(ev?.data).type !== 'pong' && JSON.parse(ev?.data).type !== 'user connected') {
      window.store.dispatch({ isLoading: true });
      const { currentChatMessages } = window.store.getState();
      const { currentChatId } = window.store.getState();

      if (currentChatMessages) {
        if (currentChatMessages.length > 0 && currentChatMessages[0].chat_id == currentChatId) {
          let newMessage = JSON.parse(ev.data);
          newMessage = {
            ...newMessage,
            chat_id: currentChatId,
          };
          // @ts-ignore
          currentChatMessages.push(newMessage);

          window.store.dispatch({ currentChatMessages });
        } else if (JSON.parse(ev.data).length === 0) {
          window.store.dispatch({ currentChatMessages: JSON.parse(ev.data) });
        } else if (ev.data.indexOf('chat_id') !== -1) {
          window.store.dispatch({ currentChatMessages: JSON.parse(ev.data) });
        } else {
          let newMessage = JSON.parse(ev.data);
          newMessage = {
            ...newMessage,
            chat_id: currentChatId,
          };
          // @ts-ignore
          currentChatMessages.push(newMessage);

          window.store.dispatch({ currentChatMessages });
        }
      }

      window.store.dispatch({ isLoading: false });
    }
  };
};

export const startAllWebsocket = async (
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: StartAllWebSocketPayload,
) => {
  const ws: Array<Record<string, WebSocket>> | undefined = [];
  dispatch({
    ws,
    isLoading: true,
  });
  // eslint-disable-next-line no-restricted-syntax
  for (const item of action.chats) {
    const payload = {
      chatId: item.id,
    };
    dispatch(startWebsocket, payload);
  }
  dispatch({ isLoading: false });
};
export const startWebsocket = async (
  dispatch: Dispatch<AppState>,
  // @ts-ignore
  state: AppState,
  action: StartWebSocketPayload,
) => {
  const token: Record<string, any> | undefined = await chatAPI.getChatToken(
    { chatId: action.chatId },
  ) as Record<string, any> | undefined;
  const payload = {
    token: token?.token,
    userId: window.store?.getState()?.user?.id,
    chatId: action.chatId,
  };
  dispatch(openWebSocket, payload);
};
