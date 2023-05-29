import Block from "../../../../scripts/utils/block";
import  template  from "./dialogsSideBar.hbs";
import {DialogPreview, DialogPreviewProps} from "../dialogPreview/DialogPreview";

export interface DialogsSideBarProps {
    dialogs: DialogPreviewProps[]
}

export  class DialogsSideBar extends Block {
    constructor(props: DialogsSideBarProps) {
        super(props);
    }

    protected init() {
        this.children.dialogs = this.props.dialogs.map((props) => new DialogPreview(props));

    }

    render() {
        return this.compile(template, this.props);
    }
}
