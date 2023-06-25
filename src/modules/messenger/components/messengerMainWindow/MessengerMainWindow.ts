import Block from "../../../../scripts/utils/Block";
import  template  from "./messengerMainWindow.hbs";
import {Message, MessageProps} from "../message/Message";
import {collectInputsData} from "../../../../scripts/content/handlers/FormHandler";
import {validateInput} from "../../../../scripts/content/validator/validator";
import {withStore} from "../../../../scripts/utils/withStore";

export interface MessengerMainWindowProps {
    messageDate: string,
    messages: Array<MessageProps>;
    active: boolean;
    event?: {};
    error?: string;
}

export  class MessengerMainWindow extends Block {
    constructor(props: MessengerMainWindowProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            submit: (event: Event) => {
                collectInputsData(event);
                const input = this.element!.querySelector('input');
                this.props.error = validateInput(input)
            }
        }
    }

    render() {
        if (this.props.store.state?.currentChatMessages.length > 0) {
            const sortedMessages:Array<Record<string, any>> = window.store.getState()?.currentChatMessages as Array<Record<string, any>>;
            sortedMessages?.sort((a, b) => a?.time > b?.time ? -1: 1 )

            this.children.messages = this.props.store.state?.currentChatMessages?.map((props: MessageProps) => new Message(props));
        }
        else { // @ts-ignore
            if (this.children.messages?.length > 0 ) {
                        // @ts-ignore
                this.children.messages?.forEach((item: Block) => {
                    item?.destroy();
                })
                this.children.messages = this.props.store.state?.currentChatMessages;
            }
        }
        return this.compile(template, this.props);
    }
}

// @ts-ignore
export default withStore(MessengerMainWindow)
