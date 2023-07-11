/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../scripts/utils/Block';
import template from './messenger.hbs';
// eslint-disable-next-line max-len
import MessengerMainWindow, {
  MessengerMainWindowProps,
} from './components/messengerMainWindow/MessengerMainWindow';
import DialogsSideBar, { DialogsSideBarProps } from './components/dialogsSidebar/dialogsSideBar';
import { withStore } from '../../scripts/utils/withStore';
import { Modal, ModalProps } from '../components/modal/Modal';
import { handleButtonClick } from '../../scripts/content/handlers/ButtonsHandler';
import { BUTTON_NAME, MESSENGER_STATE } from '../../scripts/constant';
import { deleteChat, getAllChats } from '../../services/chat';
import { startAllWebsocket } from '../../services/socket';
import getCurrentChatWebsocket from '../../scripts/utils/helpers/getCurrentChatWebsoket';
import { Popup } from './components/popup/popup';
import './styles.pcss';

export interface MessengerProps {
    messengerMainWindow: MessengerMainWindowProps;
    sidebar: DialogsSideBarProps;
    modal?: Modal | null;
}

const addUserModalProps: ModalProps = {
  modalWithInputText: {
    title: 'Add new user',
    formID: BUTTON_NAME.ADD_USER,
    buttonName: BUTTON_NAME.ADD_USER,
    buttonText: 'Add',
    name: BUTTON_NAME.ADD_USER,
    input: {
      name: 'login',
      text: 'User name',
      type: 'text',
    },
  },
};
const deleteUserModalProps: ModalProps = {
  modalWithInputText: {
    title: 'Delete user from chat',
    formID: BUTTON_NAME.DELETE_USER,
    buttonName: BUTTON_NAME.DELETE_USER,
    buttonText: 'Delete',
    name: BUTTON_NAME.DELETE_USER,
    input: {
      name: 'login',
      text: 'User name',
      type: 'text',
    },
  },
};
const addChatModalProps: ModalProps = {
  modalWithInputText: {
    title: 'Create new chat',
    formID: BUTTON_NAME.ADD_CHAT,
    buttonName: BUTTON_NAME.ADD_CHAT,
    buttonText: 'Add',
    name: BUTTON_NAME.ADD_CHAT,
    input: {
      name: 'newChatTitle',
      text: 'Chat title',
      type: 'text',
    },
  },
};

export class Messenger extends Block {
  constructor(props: MessengerProps) {
    super(props);
  }

  protected init() {
    this.changeState();
    this.children.messengerMainWindow = new MessengerMainWindow(
            <MessengerMainWindowProps> this.props.messengerMainWindow,
    );
    this.children.sidebar = new DialogsSideBar(<DialogsSideBarProps> this.props.sidebar);
    this.props.events = {
      click: (event: Event) => {
        handleButtonClick(<HTMLButtonElement>event.target);
      },
    };
    window.store.dispatch(getAllChats);

    const waitLoadChats = setInterval(() => {
      if (!window.store.getState().isLoading) {
        clearInterval(waitLoadChats);
        const payload = {
          chats: this.props.store.state.chats,
          userId: this.props.store.state.user.id,
        };
        window.store.dispatch(startAllWebsocket, payload);
      }
    }, 500);
  }

  render() {
    this.changeState();
    return this.compile(template, this.props);
  }

  changeState() {
    const ws = getCurrentChatWebsocket();

    switch (this.props?.store?.state?.messengerState) {
      case MESSENGER_STATE.NEW_CHAT:
        if (!this.children.modal
                    // @ts-ignore
                    || this.children?.modal?.children?.modalWithInputText.props.name
                    !== BUTTON_NAME.ADD_CHAT) {
          this.children.modal = new Modal(addChatModalProps);
        }
        this.children.modal.show();

        break;
      case MESSENGER_STATE.DELETE_CHAT:
        // TODO: Добавить окно подтверждения
        window.store.dispatch(deleteChat, { data: { chatId: this.props.store.state.currentChatId } });
        window.store.dispatch({ messengerState: '' });

        break;
      case MESSENGER_STATE.ADD_USER:
        if (!this.children.modal
                    // @ts-ignore
                    || this.children?.modal?.children?.modalWithInputText.props.name
                    !== BUTTON_NAME.ADD_USER) {
          this.children.modal = new Modal(addUserModalProps);
        }
        this.children.modal.show();

        break;
      case MESSENGER_STATE.DELETE_USER:
        if (!this.children.modal
                    // @ts-ignore
                    || this.children?.modal?.children?.modalWithInputText.props.name
                    !== BUTTON_NAME.DELETE_USER) {
          this.children.modal = new Modal(deleteUserModalProps);
        }
        this.children.modal.show();

        break;
      case MESSENGER_STATE.OPEN_CHAT:
        if (ws) {
          ws.send(JSON.stringify({
            content: '0',
            type: 'get old',
          }));
          window.store.dispatch({ messengerState: MESSENGER_STATE.IDLE });
        }
        break;
      case MESSENGER_STATE.POPUP_HEADER_OPEN:
        const popup = new Popup({
          buttons: [{
            name: BUTTON_NAME.ADD_USER,
            text: 'Add user',
          },
          {
            name: BUTTON_NAME.DELETE_USER,
            text: 'Delete user',
          },
          {
            name: BUTTON_NAME.DELETE_CHAT,
            text: 'Delete chat',
          },
          ],
        });
        if (!this.children.messengerMainWindow.children.header_popup) {
          this.children.messengerMainWindow.children.header_popup = popup;
        }

        this.children.messengerMainWindow.children.header_popup.show();
        break;
      case MESSENGER_STATE.IDLE:
        if (this.children.modal) {
          this.children.modal.hide();
        }
        if (this.children?.messengerMainWindow?.children?.header_popup) {
          this.children.messengerMainWindow.children.header_popup.hide();
        }
    }
  }
}

export default withStore(Messenger);
