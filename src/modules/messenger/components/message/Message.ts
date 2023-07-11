/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './message.hbs';
import changeDateFormat from '../../../../scripts/utils/helpers/changeDateFormat';

export interface MessageProps {
    sendByYou: boolean;
    text: string;
    time: string;
    events: {};
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  protected init() {
    this.props.text = this.props.content;
    this.props.time = changeDateFormat(this.props.time);
    this.props.sendByYou = this.props.user_id === window.store?.getState()?.user?.id;
  }

  render() {
    return this.compile(template, this.props);
  }
}
