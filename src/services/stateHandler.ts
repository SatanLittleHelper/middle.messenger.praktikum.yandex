/* eslint-disable import/extensions,import/no-unresolved */
import renderDOM from '../scripts/utils/helpers/renderDOM';
import Notification from '../modules/notification/notification';
import Loader from '../modules/loader/loader';

// eslint-disable-next-line import/prefer-default-export
export class StateHandler {
  constructor() {

  }

  handleState() {
    if (window.store.getState().Error) {
      const notification = new Notification({});
      renderDOM(notification, '#error');
    }

    if (window.store.getState().isLoading) {
      const loader = new Loader({});
      renderDOM(loader, '#loader');
    }
  }
}
