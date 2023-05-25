import Block from "../../../scripts/utils/block";
import  template  from "./input.hbs";

export interface InputProps {
    type: string;
    text: string;
    name: string;
    error: string;
    events: {};
}

export  class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
