import Block from "../../../scripts/utils/Block";
import {Input, InputProps} from "../inputs/Input";
import template from "./form.hbs";
import {collectInputsData} from "../../../scripts/content/handlers/FormHandler";
import {validateForm} from "../../../scripts/content/validator/validator";
import {withRouter} from "../../../scripts/utils/withRouter";


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
        console.log(this.props);
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
export default withRouter(Form);

