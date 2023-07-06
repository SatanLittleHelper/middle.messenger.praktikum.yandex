import {AppState, defaultState} from "./scripts/store";
import {Store} from "./scripts/utils/store";
import {initRouter} from "./router";
import {initApp} from "./services/initApp";
import {StateHandler} from "./services/stateHandler";

declare global {
    interface Window {
        store: Store<AppState>;
        stateHandler: StateHandler;
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    window.store = store;

    const stateHandler = new StateHandler();

    store.on('changed', (prevState, nextState) => {
        if(!prevState.appIsInited && nextState.appIsInited) {
            initRouter(store);
        }
        stateHandler.handleState();
        console.log(
            '%cstore updated',
            'background: #222; color: #bada55',
            nextState,
        );
    });

    store.dispatch(initApp);

})
