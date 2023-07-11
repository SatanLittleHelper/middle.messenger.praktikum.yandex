/* eslint-disable import/extensions,import/no-unresolved */
import { BlockClass } from './Block';
import { router } from '../../router';

type WithRouterProps = {};

// eslint-disable-next-line import/prefer-default-export
export function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
          super({
            ...props,
            router,
          });
        }
  } as BlockClass<P>;
}
