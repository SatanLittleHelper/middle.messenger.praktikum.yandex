/* eslint-disable import/extensions,import/no-unresolved */
import { BlockClass } from '../../scripts/utils/Block';
import { MessengerProps } from '../../modules/messenger/Messenger';

type WithMessengerPageProps = {
    messengerMainWindow: Record<string, any>;
    sidebar: Record<string, any>;

};

// eslint-disable-next-line import/prefer-default-export
export function WithMessengerPage<P extends WithMessengerPageProps>(WrappedBlock: BlockClass<P>) {
  // @ts-ignore
  return class extends WrappedBlock<P> {
    constructor(props: P) {
      const messengerPageProps: MessengerProps = {
        messengerMainWindow: {
          active: false,
          messageDate: '',
          messages: [],
        },
        sidebar: {
          dialogs: [],
        },
      };

      super({ props, ...messengerPageProps });
    }
  } as BlockClass<Omit<P, 'MessengerPage'>>;
}
