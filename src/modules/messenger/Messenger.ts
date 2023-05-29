import Block from "../../scripts/utils/block";
import  template  from "./messenger.hbs";
import {MessengerMainWindow, MessengerMainWindowProps} from "./components/messengerMainWindow/MessengerMainWindow";
import {DialogsSideBar, DialogsSideBarProps} from "./components/dialogsSidebar/dialogsSideBar";

export interface MessengerProps {
    messengerMainWindow: MessengerMainWindowProps;
    sidebar: DialogsSideBarProps;
}

export  class Messenger extends Block {
    constructor(props: MessengerProps) {
        super(props);
    }

    protected init() {
        this.children.messengerMainWindow = new MessengerMainWindow(<MessengerMainWindowProps>this.props.messengerMainWindow);
        this.children.sidebar = new DialogsSideBar(<DialogsSideBarProps>this.props.sidebar);

    }

    render() {
        return this.compile(template, this.props);
    }
}
