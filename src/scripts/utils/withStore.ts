/* eslint-disable import/extensions,import/no-unresolved */
import { AppState } from '../store';
import { Store } from './store';
import { BlockClass } from './Block';

type WithStateProps = { store: Store<AppState> };

// eslint-disable-next-line import/prefer-default-export
export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
  // @ts-ignore
  return class extends WrappedBlock<P> {
    constructor(props: P) {
      super({
        ...props,
        store: window.store,
      });
    }

        __onChangeStoreCallback = () => {
          // @ts-expect-error this is not typed
          this.setProps({
            // @ts-ignore
            ...this.props,
            store: window.store,
          });
        };

        componentDidMount(props: P) {
          super.componentDidMount(props);
          window.store.on('changed', this.__onChangeStoreCallback);
        }

        componentWillUnmount() {
          super.componentWillUnmount();
          window.store.off('changed', this.__onChangeStoreCallback);
        }
  } as BlockClass<Omit<P, 'store'>>;
}
