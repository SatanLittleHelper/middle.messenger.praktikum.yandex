import Block from "../../../../scripts/utils/block";
import  template  from "./profileForm.hbs";
import {ProfileInput, ProfileInputProps} from "../profileInput/ProfileInput";
import FormHandler from "../../../../scripts/content/handlers/FormHandler";

export interface ProfileFormProps {
    inputs: ProfileInputProps[];
    formId: string;
    events?: {};

}

export  class ProfileForm extends Block {
    constructor(props: ProfileFormProps) {
        super(props);
    }

    protected init() {
    this.children.inputs = this.props.inputs?.map((props) => new ProfileInput(props));
    this.props.events = {

    }
    }

    protected componentDidMount() {
        new FormHandler();

    }
    render() {
        return this.compile(template, this.props);
    }
}
