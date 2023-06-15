import {BaseAPI} from "../baseAPI";
import {HTTPTransport} from "../../utils/HTTPTransport";

const chatAPIInstance = new HTTPTransport('api/v1/chats');

export class UserAPI extends BaseAPI {


  export function getUser() {
      return chatAPIInstance.get('/');
  }

}
