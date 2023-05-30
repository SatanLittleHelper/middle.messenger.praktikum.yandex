import Block from "../../../scripts/utils/block";
import {Input, InputProps} from "../inputs/Input";
import  template  from "./form.hbs";
import FormHandler from "../../../scripts/content/handlers/FormHandler";


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
        this.children.inputs = this.props.formInputs.map((props) => new Input(props));

    }

    protected componentDidMount() {
        new FormHandler();

    }

    render() {
        return this.compile(template, this.props);
    }
}
