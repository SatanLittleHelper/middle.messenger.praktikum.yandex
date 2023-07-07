import {Dispatch} from "../scripts/utils/store";
import {AppState} from "../scripts/store";
import {socketAPI} from "../scripts/api/socket";
import {chatAPI} from "../scripts/api/chat";

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



// @ts-ignore
export const openWebSocket = async (dispatch: Dispatch<AppState>, state: AppState, action: WebSocketPayload,) => {
    let interval: NodeJS.Timer;
    const webSocket = await socketAPI.open(action);
    webSocket.onopen = () => {

        const ws = window.store.getState()?.ws;
        let wsObj: Record<string, WebSocket> = {} as Record<string, WebSocket>
        wsObj[action.chatId] = webSocket;
        ws!.push(wsObj)
        window.store.dispatch({ws})

        interval = setInterval(() => {
            console.log('ping')
            webSocket.send(JSON.stringify({type: "ping"}))
        }, 5000)
    }
    webSocket.onclose = (ev) => {
        console.log(ev.type)
        clearInterval(interval);

    }
    webSocket.onmessage = (ev) => {
        if (ev.data === "WS token is not valid") {
            return;

        }
        if (JSON.parse(ev?.data).type !== 'pong' && JSON.parse(ev?.data).type !== 'user connected') {
            window.store.dispatch({isLoading: true})
            let currentChatMessages = window.store.getState().currentChatMessages;
            const currentChatId = window.store.getState().currentChatId;

            if (currentChatMessages) {
                if (currentChatMessages.length > 0 && currentChatMessages[0].chat_id == currentChatId) {
                    let newMessage = JSON.parse(ev.data);
                        newMessage = {...newMessage, chat_id: currentChatId};
                        // @ts-ignore
                    currentChatMessages.push(newMessage);

                        window.store.dispatch({currentChatMessages: currentChatMessages});

                    }
                else {

                    if (JSON.parse(ev.data).length === 0) {
                        window.store.dispatch({currentChatMessages: JSON.parse(ev.data)});

                    }
                    else if (ev.data.indexOf('chat_id') !== -1) {
                        window.store.dispatch({currentChatMessages: JSON.parse(ev.data)});

                    }
                    else {
                        let newMessage = JSON.parse(ev.data);
                        newMessage = {...newMessage, chat_id: currentChatId};
                        // @ts-ignore
                        currentChatMessages.push(newMessage);

                        window.store.dispatch({currentChatMessages: currentChatMessages});
                    }
                }
            }

            window.store.dispatch({isLoading: false});
        }

    }
}

// @ts-ignore
export const startAllWebsocket  = async  (dispatch: Dispatch<AppState>, state: AppState, action: StartAllWebSocketPayload,) => {
    const ws: Array<Record<string, WebSocket>> | undefined = []
    dispatch({ws: ws, isLoading: true})
    for (const item of action.chats) {
        const payload = {
            chatId: item.id
        }
        dispatch(startWebsocket, payload)
    }
    dispatch({isLoading:false})
}
// @ts-ignore
export const startWebsocket  = async  (dispatch: Dispatch<AppState>, state: AppState, action: StartWebSocketPayload,) => {
        const token: Record<string, any> | undefined = await chatAPI.getChatToken({chatId: action.chatId}) as Record<string, any> | undefined
        const payload = {
            token: token?.token,
            userId: window.store?.getState()?.user?.id,
            chatId: action.chatId,
        }
        dispatch(openWebSocket, payload);
}

