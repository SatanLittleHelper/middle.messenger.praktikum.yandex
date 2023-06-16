import Block from "../../../scripts/utils/Block";
import {Input, InputProps} from "../inputs/Input";
import template from "./form.hbs";
import {collectInputsData, submitHandler} from "../../../scripts/content/handlers/FormHandler";
import {validateForm} from "../../../scripts/content/validator/validator";
import {withRouter} from "../../../scripts/utils/withRouter";


export interface FormProps {
    header: string;
    links: Record<string, string>;
    buttonsText: Record<string, string>;
    formName: string;
    formInputs: InputProps[];
    events?: {}
}

export  class Form extends Block {
    constructor(props: FormProps) {
        super(props);
    }

    protected init() {
        this.children.inputs = this.props?.formInputs?.map((props:InputProps) => new Input(props));
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                submitHandler(event);
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

