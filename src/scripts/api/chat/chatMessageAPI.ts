import {HTTPTransport} from "../../utils/HTTPTransport";
import {BaseAPI} from "../baseAPI";

const chatMessagesAPIInstance = new HTTPTransport('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}
