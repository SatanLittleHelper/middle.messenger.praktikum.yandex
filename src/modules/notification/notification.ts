/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../scripts/utils/Block';
import template from './notification.hbs';
import { withStore } from '../../scripts/utils/withStore';

export interface notificationProps {
    error?: string;
}

export class Notification extends Block {
  constructor(props: notificationProps) {
    super(props);
  }

  protected init() {
    this.props.error = this.props.store?.state.Error;
    setTimeout(() => {
      window.store.dispatch({ Error: '' });

      this.destroy();
    }, 5000);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(Notification);
