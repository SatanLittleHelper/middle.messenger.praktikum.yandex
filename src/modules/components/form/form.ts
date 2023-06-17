import Block from "../../../scripts/utils/Block";
import {Input, InputProps} from "../inputs/Input";
import template from "./form.hbs";
import {collectInputsData, submitHandler} from "../../../scripts/content/handlers/FormHandler";
import {validateForm} from "../../../scripts/content/validator/validator";
import {withRouter} from "../../../scripts/utils/withRouter";
import {withStore} from "../../../scripts/utils/withStore";


export interface FormProps {
    header: string;
    links: Record<string, string>;
    buttonsText: Record<string, string>;
    formName: string;
    formInputs: InputProps[];
    authError: string;
    events?: {}
}

export  class Form extends Block {
    constructor(props: FormProps) {
        super(props);
    }

    protected init() {
        this.props.authError = this.props.store.getState().loginFormError
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
export default withStore(withRouter(Form));

