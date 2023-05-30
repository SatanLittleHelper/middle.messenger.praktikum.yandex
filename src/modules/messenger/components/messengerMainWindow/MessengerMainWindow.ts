import Block from "../../../../scripts/utils/block";
import  template  from "./messengerMainWindow.hbs";
import {Message, MessageProps} from "../message/Message";
import {collectInputsData} from "../../../../scripts/content/handlers/FormHandler";

export interface MessengerMainWindowProps {
    messageDate: string,
    messages: MessageProps[];
    event?: {}
}

export  class MessengerMainWindow extends Block {
    constructor(props: MessengerMainWindowProps) {
        super(props);
    }

    protected init() {
        this.children.messages = this.props.messages.map((props) => new Message(props));
        this.props.events = {
            submit: (event) => {
                collectInputsData(event);

            }
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
