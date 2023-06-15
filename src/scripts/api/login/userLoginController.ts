import {LoginAPI} from "./loginAPI";
import {LoginFormModel} from "../../../types/types";
import {Router} from "../../utils/Router/Router";

const loginApi = new LoginAPI();
const userLoginValidator = validateLoginFields(validateRules);

class UserLoginController {
    @validate(userLoginValidateRules)
    @handleError(handler)

    public async login(data: LoginFormModel) {
            // Запускаем крутилку

            const userID = loginApi.request(prepareDataToRequest(data));

            Router.go('/chats');

            // Останавливаем крутилку

    }
}
