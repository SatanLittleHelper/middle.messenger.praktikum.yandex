import Block from "../../../../scripts/utils/Block";
import  template  from "./controls.hbs";

export interface ControlsProps {
    saveButtons?: ProfileSaveButtonsProps[];
    buttons?: ProfileButtonsProps[];
}

export interface ProfileButtonsProps {
    link: string;
    text: string;
    buttonRed: boolean;
}

export  interface ProfileSaveButtonsProps {
    link: string;
}

export  class Controls extends Block {
    constructor(props: ControlsProps) {
        super(props);
    }

    protected init() {

    }

    render() {
        return this.compile(template, this.props);
    }
}
