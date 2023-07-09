import Block from "../../../scripts/utils/Block";
import {Input, InputProps} from "../inputs/Input";
import template from "./form.hbs";
import {submitHandler} from "../../../scripts/content/handlers/FormHandler";
import {formHasError} from "../../../scripts/content/validator/validator";
import {withRouter} from "../../../scripts/utils/withRouter";
import {withStore} from "../../../scripts/utils/withStore";
import "./styles.pcss"

export interface FormProps {
    header: string;
    links: Record<string, string>;
    buttonsText: Record<string, string>;
    formName: string;
    formInputs: InputProps[];
    authError?: string;
    events?: {};
}

export class Form extends Block {
    constructor(props: FormProps) {
        super(props);

    }

    protected init() {
        this.props.authError = this.props.store.getState()?.Error
        this.children.inputs = this.props?.formInputs?.map((props:InputProps) => new Input(props));
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                if (!formHasError(this)) {
                    submitHandler(event);
                }
            },
            click: (event: Event) => {

                    // @ts-ignore
                if (event.target?.name === 'link') {
                    this.props.router.go(this.props.links.sub);
                }
            }
        }

    }

    protected componentDidMount() {
        if(this.props.store.state.user?.id) {
            this.props.router.go('/messenger')
            return;
        }
    }

    render() {

        return this.compile(template, this.props);
    }
}
export default withStore(withRouter(Form));

