import Block from "../../../scripts/utils/Block";
import template from "./input.hbs";
import {validateInputTriggeredByEvent} from "../../../scripts/content/validator/validator";

export interface InputProps {
    type: string;
    text: string;
    name: string;
    error?: string;
    value?: string;
    class_name?: string
    events?: {};
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            focusout: (event: FocusEvent) => {
                this.props.error = validateInputTriggeredByEvent(event);
                // @ts-ignore
                this.props.value = event.target?.value;

            },

        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
