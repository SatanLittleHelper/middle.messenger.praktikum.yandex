import Block from "../../../../scripts/utils/block";
import  template  from "./message.hbs";


export interface MessageProps {
    sendByYou: boolean;
    text: string;
    time: string;
    events: {};
}

export  class Message extends Block {
    constructor(props: MessageProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
