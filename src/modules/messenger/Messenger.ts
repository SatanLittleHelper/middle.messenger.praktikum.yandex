import Block from "../../scripts/utils/Block";
import template  from "./messenger.hbs";
import MessengerMainWindow, {MessengerMainWindowProps} from "./components/messengerMainWindow/MessengerMainWindow";
import DialogsSideBar, {DialogsSideBarProps} from "./components/dialogsSidebar/dialogsSideBar";
import {withStore} from "../../scripts/utils/withStore";
import {Modal, ModalProps} from "../components/modal/Modal";
import {handleButtonClick} from "../../scripts/content/handlers/ButtonsHandler";
import {MESSENGER_STATE} from "../../scripts/constant";
import {getAllChats} from "../../services/chat";
import {startAllWebsocket} from "../../services/socket";
import {submitHandler} from "../../scripts/content/handlers/FormHandler";
import getCurrentChatWebsocket from "../../scripts/utils/helpers/getCurrentChatWebsoket";

export interface MessengerProps {
    messengerMainWindow: MessengerMainWindowProps;
    sidebar: DialogsSideBarProps;
    modal?: Modal;
}


const addUserModalProps: ModalProps = {addUser:{
        formID: 'addUser',
        buttonName: "addUser",
        name: 'addUser'
    }}

export  class Messenger extends Block {
    constructor(props: MessengerProps) {
        super(props);
    }

    protected init() {
        this.changeState();
        this.children.messengerMainWindow = new MessengerMainWindow(<MessengerMainWindowProps>this.props.messengerMainWindow);
        this.children.sidebar = new DialogsSideBar(<DialogsSideBarProps>this.props.sidebar);
        this.props.events = {
            click: (event: Event) => {
                handleButtonClick(<HTMLButtonElement>event.target);
            },
            submit: (event: Event) => {
                event.preventDefault();
                submitHandler(event)
            }
        }
        window.store.dispatch(getAllChats);

        const waitLoadChats = setInterval(() => {
            if (!window.store.getState().isLoading) {
                clearInterval(waitLoadChats);
                const payload = {
                    chats: this.props.store.state.chats,
                    userId: this.props.store.state.user.id
                }
                window.store.dispatch(startAllWebsocket, payload)
            }
        }, 500)
    }

    render() {
        this.changeState();
        return this.compile(template, this.props);
    }

    changeState() {
        const ws = getCurrentChatWebsocket()

        switch (this.props?.store?.state?.messengerState) {
            case MESSENGER_STATE.NEW_CHAT:
                this.children.modal = new Modal(addUserModalProps);
                break
            case MESSENGER_STATE.OPEN_CHAT:
                this.children.messengerMainWindow.setProps({active: true});

                if (ws) {
                    ws.send(JSON.stringify({
                        content: "0", type: "get old"
                    }));
                    window.store.dispatch({messengerState: MESSENGER_STATE.CHAT_OPENED})
                }

                break
            case MESSENGER_STATE.CHAT_OPENED:
                    window.store.dispatch({messengerState: ''})

        }
    }


}

export default withStore(Messenger);
