// import isEqual from "../helpers/isEqual";
// import Block from "../Block";
// import renderDOM from "../helpers/renderDOM";
//
// export interface RouteProps {
//     querySelector: string;
// }
// export class Route {
//     private _pathname: string;
//     private readonly _blockClass: any;
//     private _block: Block | null;
//     private _props: Record<string, any>;
//
//     constructor(pathname:string, view:Block, props:RouteProps) {
//         this._pathname = pathname;
//         this._blockClass = view;
//         this._block = null;
//         this._props = props;
//     }
//
//     navigate(pathname) {
//         if (this.match(pathname)) {
//             this._pathname = pathname;
//             this.render();
//         }
//     }
//
//     leave() {
//         if (this._block) {
//             this._block.hide();
//         }
//     }
//
//     match(pathname) {
//         return isEqual(pathname, this._pathname);
//     }
//
//     render() {
//         if (!this._block) {
//             this._block = new this._blockClass();
//             renderDOM(<Block>this._block, this._props.querySelector);
//             return;
//         }
//
//         this._block.show();
//     }
// }
//
//
