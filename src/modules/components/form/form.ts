import Block from "../../../scripts/utils/Block";
import {Input, InputProps} from "../inputs/Input";
import template  from "./form.hbs";
import {collectInputsData} from "../../../scripts/content/handlers/FormHandler";
import {validateForm} from "../../../scripts/validator/validator";


export interface FormProps {
    header: string;
    links: Record<string, string>;
    buttonsText: Record<string, string>;
    formInputs: InputProps[];
    events?: {}
}

export  class Form extends Block {
    constructor(props: FormProps) {
        super(props);
    }

    protected init() {
        this.children.inputs = this.props.formInputs.map((props) => new Input(props));
        this.props.events = {
            submit: (event) => {
                collectInputsData(event);
                validateForm(this);
            }
        }

    }

    render() {
        return this.compile(template, this.props);
    }
}
