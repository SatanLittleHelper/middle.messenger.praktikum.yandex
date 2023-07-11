/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './dialogsSideBar.hbs';
import DialogPreview, { DialogPreviewProps } from '../dialogPreview/DialogPreview';
import { withStore } from '../../../../scripts/utils/withStore';

export interface DialogsSideBarProps {
    dialogs: DialogPreviewProps[];
}

export class DialogsSideBar extends Block {
  constructor(props: DialogsSideBarProps) {
    super(props);
  }

  protected init() {

  }

  render() {
    if (window.store.getState().chats) {
      // eslint-disable-next-line max-len
      const sortedChats: Array<Record<string, any>> = window.store.getState()?.chats as Array<Record<string, any>>;
      sortedChats?.sort((
        a,
        b,
      ) => (a?.last_message?.time > b?.last_message?.time ? -1 : 1));
    }

    this.children.dialogs = window.store.getState()
      .chats
      ?.map((
        props: DialogPreviewProps,
      ) => new DialogPreview(props));

    return this.compile(template, this.props);
  }
}
export default withStore(DialogsSideBar);
