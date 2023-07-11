/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './dialogPreview.hbs';
import { handleButtonClick } from '../../../../scripts/content/handlers/ButtonsHandler';
import { withStore } from '../../../../scripts/utils/withStore';
import changeDateFormat from '../../../../scripts/utils/helpers/changeDateFormat';

export interface DialogPreviewProps {
    text: string;
    sendByYou: boolean;
    title: string;
    unread_count: number;
    time: string;
    events: {};
    avatar?: string;
    id: string;
}

export class DialogPreview extends Block {
  constructor(props: DialogPreviewProps) {
    super(props);
  }

  protected init() {
    // @ts-ignore
    const currentChat = this.props.store.state.chats.find((chat) => chat.id === this.props.id);

    this.props.text = currentChat.last_message?.content;
    this.props.time = changeDateFormat(currentChat.last_message?.time);
    this.props.sendByYou = currentChat.last_message?.user.login === this.props.store.state.user.login;

    if (!this.props.avatar) {
      this.props.avatar = currentChat.last_message?.user.avatar;
    }

    this.props.events = {
      click: (event: Event) => {
        event.stopPropagation();
        handleButtonClick(<HTMLButtonElement> this.element);
      },
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(DialogPreview);
