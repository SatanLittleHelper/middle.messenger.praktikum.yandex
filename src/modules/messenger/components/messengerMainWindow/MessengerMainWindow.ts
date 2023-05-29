import Block from "../../../../scripts/utils/block";
import  template  from "./messengerMainWindow.hbs";
import {Message, MessageProps} from "../message/Message";

export interface MessengerMainWindowProps {
    messageDate: string,
    messages: MessageProps[];
}

export  class MessengerMainWindow extends Block {
    constructor(props: MessengerMainWindowProps) {
        super(props);
    }

    protected init() {
        this.children.messages = this.props.messages.map((props) => new Message(props));

    }

    render() {
        return this.compile(template, this.props);
    }
}
