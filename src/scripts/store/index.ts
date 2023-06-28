import { User } from "../utils/apiTransformers";

export interface AppState {
    chatsOffset?: number;
    chats?: Record<string, any>;
    Error?: string | null;
    user?: User | null;
    appIsInited?: boolean;
    messengerState?: string | null;
    isLoading?: boolean
    profileState?: string | null;
    currentChatId?: string;
    currentChatToken?: string;
    ws?: Array<Record<string, WebSocket>>;
    currentChatMessages?: Array<Record<string, any>> | []

}


export const defaultState: AppState = {
    Error: null,
    user: null,
    messengerState: null,
    isLoading: false,
    profileState: null,
    currentChatMessages: []

};

