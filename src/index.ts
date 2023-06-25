import {AppState, defaultState} from "./scripts/store";
import {Store} from "./scripts/utils/store";
import {initRouter} from "./router";
import {initApp} from "./services/initApp";

declare global {
    interface Window {
        store: Store<AppState>;
    }
}
window.addEventListener('DOMContentLoaded', () => {
    console.log("ad")
    const store = new Store<AppState>(defaultState);

    window.store = store;

    console.log(window)

    store.on('changed', (prevState, nextState) => {
        if(!prevState.appIsInited && nextState.appIsInited) {
            initRouter(store);
        }
        console.log(
            '%cstore updated',
            'background: #222; color: #bada55',
            nextState,
        );
    });

    store.dispatch(initApp);

})
