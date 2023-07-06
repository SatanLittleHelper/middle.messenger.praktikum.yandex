export default function getCurrentChatWebsocket(): WebSocket | null {
    const allWS: Array<Record<string, WebSocket>> | undefined = window.store.getState().ws;
    const chatId = window.store.getState().currentChatId;

    if (chatId && allWS!.length > 0) {
        const wsObj = allWS?.find((item) => item[chatId])
        if (wsObj) {
            return wsObj[chatId];
        }
    }
    return null;
}
