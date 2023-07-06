import Messenger, {MessengerProps} from "../../modules/messenger/Messenger";
import {WithMessengerPage} from "./withMessengerPage";


class MessengerPage extends Messenger {
    constructor(props: MessengerProps) {
        super(props);
    }
}
// @ts-ignore
export default WithMessengerPage(MessengerPage);
