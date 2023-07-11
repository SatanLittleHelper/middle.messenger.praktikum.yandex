/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './messengerMainWindow.hbs';
import { Message, MessageProps } from '../message/Message';
import { submitHandler } from '../../../../scripts/content/handlers/FormHandler';
import { validateInput } from '../../../../scripts/content/validator/validator';
import { withStore } from '../../../../scripts/utils/withStore';
import { Popup } from '../popup/popup';

export interface MessengerMainWindowProps {
    messageDate: string,
    messages: Array<MessageProps>;
    active: boolean;
    event?: {};
    error?: string;
    title?: string;
    header_popup?: Popup | null;
    footer_popup?: Popup | null;
    users?: Array<Record<string, any>>
}

export class MessengerMainWindow extends Block {
  constructor(props: MessengerMainWindowProps) {
    super(props);
  }

  protected init() {
    this.props.events = {
      submit: (event: Event) => {
        event.preventDefault();
        const input = this.element!.querySelector('input');
        this.props.error = validateInput(input);

        if (!this.props.error) {
          submitHandler(event);
        }
      },
    };
  }

  render() {
    const chatId = this.props.store.state.currentChatId;
    if (chatId) {
      const currentChat = this.props.store.state.chats.find((
        chat: Record<string, any>,
      ) => chat.id == chatId);
      this.props.title = currentChat?.title;
      this.props.users = currentChat?.users;
      this.props.active = true;
    } else {
      this.props.active = false;
    }

    if (this.props.store.state?.currentChatMessages.length > 0) {
      // eslint-disable-next-line max-len
      const sortedMessages: Array<Record<string, any>> = window.store.getState()?.currentChatMessages as Array<Record<string, any>>;
      sortedMessages?.sort((a, b) => (a?.time > b?.time ? -1 : 1));

      this.children.messages = this.props.store.state?.currentChatMessages?.map((
        props: MessageProps,
      ) => new Message(props));
    } else { // @ts-ignore
      if (this.children.messages?.length > 0) {
        // @ts-ignore
        this.children.messages?.forEach((item: Block) => {
          item?.destroy();
        });
        this.children.messages = this.props.store.state?.currentChatMessages;
      }
    }
    return this.compile(template, this.props);
  }
}

// @ts-ignore
export default withStore(MessengerMainWindow);
