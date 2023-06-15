// import {Route} from "./Route";
//
// export class Router {
//     private static __instance: Router;
//     private routes: Route[];
//     private history: History;
//     private _currentRoute: Route | null;
//     private readonly _rootQuery: string;
//     constructor(rootQuery) {
//         if (Router.__instance) {
//             return Router.__instance;
//         }
//
//         this.routes = [];
//         this.history = window.history;
//         this._currentRoute = null;
//         this._rootQuery = rootQuery;
//
//         Router.__instance = this;
//     }
//
//     use(pathname, block) {
//         const route = new Route(pathname, block, {querySelector: this._rootQuery});
//
//         this.routes.push(route);
//
//         return this;
//     }
//
//     start() {
//         window.onpopstate = (event => {
//             this._onRoute(event.currentTarget.location.pathname);
//         }).bind(this);
//
//         this._onRoute(window.location.pathname);
//     }
//
//     _onRoute(pathname) {
//         const route = this.getRoute(pathname);
//         if (!route) {
//             return;
//         }
//
//         if (this._currentRoute && this._currentRoute !== route) {
//             this._currentRoute.leave();
//         }
//
//         this._currentRoute = route;
//         route.render();
//     }
//
//     go(pathname) {
//         this.history.pushState({}, '', pathname);
//         this._onRoute(pathname);
//     }
//
//     back() {
//         this.history.back();
//     }
//
//     forward() {
//         this.history.forward();
//     }
//
//     getRoute(pathname) {
//         return this.routes.find(route => route.match(pathname));
//     }
// }
