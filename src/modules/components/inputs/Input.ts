import Block from "../../../scripts/utils/block";
import  template  from "./input.hbs";
import {validateInput} from "../../../scripts/validator/validator";

export interface InputProps {
    type: string;
    text: string;
    name: string;
    error: string;
    value?: string;
    events?: {};
}

export  class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            focusout: (event) => {
                this.props.error = validateInput(event);
                this.props.value = event.target.value;

            },
            submit: (event) => {
                this.props.error = validateInput(event);
                this.props.value = event.target.value;

            },

        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
