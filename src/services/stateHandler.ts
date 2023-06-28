import renderDOM from "../scripts/utils/helpers/renderDOM";
import Notification from "../modules/notification/notification";
import Loader from "../modules/loader/loader";

export class StateHandler{
    constructor() {

    }

    handleState() {
        if (window.store.getState().Error) {
            const notification = new Notification({});
            renderDOM(notification, "#error");

        }

        if(window.store.getState().isLoading) {
            const loader = new Loader({})
            renderDOM(loader, "#loader");

        }
    }
}

