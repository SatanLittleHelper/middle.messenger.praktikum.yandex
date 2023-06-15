import store from "../../utils/store";
import {UserAPI} from "./userAPI";

class UserController {
    public getUser() {
        UserAPI.getUser()
            .then(data => store.set('user', data);
    }
}
