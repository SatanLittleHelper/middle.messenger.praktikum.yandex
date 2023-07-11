/* eslint-disable import/extensions,import/no-unresolved */
import PathRouter from './scripts/utils/Router/Router';
import { AppError } from './modules/error/AppError';
import { Store } from './scripts/utils/store';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Messenger from './pages/messenger';

export const router = new PathRouter('#app');
const errorPageProps = {
  code: '404',
  description: 'Not found',
  events: {},

};

export function initRouter(store: Store<any>) {
  router
    .use({
      pathname: '/',
      // @ts-ignore
      block: Login,
      exact: true,
      needAuth: false,
      onUnautorized(): void {
      },
      props: {},
      redirectPath: '',
    })
    .use({
      pathname: '/sign-up',
      // @ts-ignore
      block: Signup,
      exact: true,
      needAuth: false,
      onUnautorized(): void {
      },
      props: {},
      redirectPath: '',
    })
    .use({
      pathname: '/messenger',
      // @ts-ignore
      block: Messenger,
      exact: true,
      needAuth: true,
      onUnautorized: () => Boolean(store?.getState()?.user?.id),
      props: {},
      redirectPath: '/',
    })
    .use({
      pathname: '/settings',
      // @ts-ignore
      block: Profile,
      exact: true,
      needAuth: true,
      onUnautorized: () => Boolean(store?.getState()?.user?.id),
      redirectPath: '/',
    })
    .use({
      pathname: '/404',
      // @ts-ignore
      block: AppError,
      exact: true,
      needAuth: false,
      onUnautorized(): void {
      },
      props: errorPageProps,
      redirectPath: '',
    })
    .start();
}
