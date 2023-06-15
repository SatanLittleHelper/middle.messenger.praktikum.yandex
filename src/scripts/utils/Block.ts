import EventBus from "./eventBus";
import { nanoid } from "nanoid";

export interface BlockClass<P> extends Function {
    new (props: P): Block<P>;
    componentName?: string;
}
class Block<P = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    public children: Record<string, Block>;

    protected props: P;
    protected refs: { [key: string]: HTMLElement } = {};

    private _element: HTMLElement | null = null;
    private eventBus: () => EventBus;



    /** JSDoc
     * @param {Object} propsWithChildren
     *
     * @returns {void}
     */
    constructor(propsWithChildren: any = {}) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

     _getChildrenAndProps(childrenAndProps: Record<string, any>) {
        const props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children }
    }
   _addEvents() {
        const {events = {}} = this.props as {events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            this._element!.addEventListener(eventName, events[eventName]);
        });
    }
    _removeEvents() {
        const {events = {}} = this.props as {events: Record<string, () => void> };
        Object.keys(events).forEach(eventName => {
            this._element!.removeEventListener(eventName, events[eventName]);
        });
    }

     _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const  tagName  = 'div';
        this._element = this._createDocumentElement(tagName);
    }


    private _init() {
        this._createResources();
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

    }

    protected init() {

    }

    private _componentDidMount() {
        this.componentDidMount();
    }
    protected componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) =>
                child.dispatchComponentDidMount()
        );
    }

   private _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
        return true;
    }

    _componentWillUnmount() {
        this.eventBus().destroy();
        this.componentWillUnmount();
    }

    public componentWillUnmount() {}

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }
        // @ts-ignore
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(
                    (component) => `<div data-id="${component.id}"></div>`
                );
            } else {
                contextAndStubs[name] = `<div data-id="${component?.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement("template");

        temp.innerHTML = html;

        const replaceStubToComponent = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component?.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((component) => replaceStubToComponent(component));
            } else {
                replaceStubToComponent(component);
            }
        });

        return temp.content;
    }
    private _render() {
        this._removeEvents();
        const fragment = this.render();

        const newElement = fragment.firstElementChild as HTMLElement;
        this._element!.replaceWith(newElement);
        this._element = newElement;

        this._addEvents()
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    public getContent() {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100);
        }

        return this.element!;
    }

    _makePropsProxy(props: any) {
        const self = this;

        // noinspection TypeScriptValidateTypes
       return new Proxy(props, {
            get(target, prop:string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: any, prop: string, value: any) {
                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error ('нет доступа');
            },


        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
