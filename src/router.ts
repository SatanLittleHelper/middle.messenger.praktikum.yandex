import { getScreenComponent, Screens } from '../src/scripts/utils/screenList';
import {HashRouter} from "./scripts/utils/hashRouter/hashRouter";
import {AppState} from "./scripts/store";
import {Store} from "./scripts/utils/store";
import renderDOM from "./scripts/utils/helpers/renderDOM";

const routes = [
    {
        path: '#login',
        block: Screens.Login,
        shouldAuthorized: false,
    },
    // {
    //     path: '#home',
    //     block: Screens.Home,
    //     shouldAuthorized: true,
    // },
    // {
    //     path: '#description',
    //     block: Screens.Description,
    //     shouldAuthorized: true,
    // },
    {
        path: '*',
        block: Screens.Login,
        shouldAuthorized: true,
    },
];

export function initRouter(router: HashRouter, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user);
            const currentScreen = Boolean(store.getState().screen);

            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({ screen: route.block });
                return;
            }

            if (!currentScreen) {
                console.log('go to home');
                store.dispatch({ screen: Screens.Login });
            }
        });
    });

    store.on('changed', (prevState, nextState) => {
        if (!prevState.appIsInited && nextState.appIsInited) {
            router.start();
        }

        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen);
            renderDOM(new Page({}));
        }
    });
}
