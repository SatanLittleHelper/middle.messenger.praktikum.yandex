import Block from "../../../../scripts/utils/Block";
import  template  from "./dialogPreview.hbs";
import {Message, MessageProps} from "../message/Message";

export interface DialogPreviewProps {
    text: string;
    sendByYou: boolean;
    username: string;
    unreadCount: number;
    time: string;
    events: {};
}

export  class DialogPreview extends Block {
   constructor(props: DialogPreviewProps) {
       super(props);
   }

    protected init() {

    }

    render() {
        return this.compile(template, this.props);
    }
}
