import Block from "../../../scripts/utils/block";
import {Input, InputProps} from "../inputs/Input";
import  template  from "./form.hbs";

interface FormProps {
    header: string;
    links: Record<string, string>;
    buttonsText: Record<string, string>;
    formInputs: InputProps[];
}

export  class Form extends Block {
    constructor(props: FormProps) {
        super(props);
    }

    protected init() {
        this.children.formInputs = this.props.formInputs.map((props) => new Input(props));

    }

    render() {
        console.log((this.props))
        return this.compile(template, this.props);
    }
}
