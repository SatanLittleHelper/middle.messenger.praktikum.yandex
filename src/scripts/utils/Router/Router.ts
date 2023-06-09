import Route from "./Route";
import Block from "../Block";

type TRouteConstructor = {
    pathname: string,
    block: Block,
    props: any,
    exact: true,
    needAuth: boolean,
    redirectPath: string,
    onUnautorized: () => void
}

export default class PathRouter {
    private static __instance: PathRouter;
    public history: History;
    private routes: Route[];
    private _currentRoute!: Route;
    private readonly _rootQuery: string;

    constructor(rootQuery: string) {

        this.routes = [];
        this.history = window.history;
        this._rootQuery = rootQuery;

    }

    static getInstance() {
        return this.__instance;
    }

    use({pathname, block, props = {}, exact = true, needAuth = false, onUnautorized, redirectPath}: TRouteConstructor) {
        const redirect = () => this.go(redirectPath);
        const route = new Route(
            pathname,
            block,
            {rootQuery: this._rootQuery, exact},
            props,
            needAuth,
            onUnautorized,
            redirect
        );
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: any) => {
            this._onRoute(event.currentTarget?.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            this.go('/404')
            return;
        }
        this._currentRoute?.leave();
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.go(-1);
    }

    forward() {
        this.history.go(1);
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
