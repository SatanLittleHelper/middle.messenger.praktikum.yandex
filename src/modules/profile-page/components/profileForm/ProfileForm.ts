import Block from "../../../../scripts/utils/block";
import template  from "./profileForm.hbs";
import {ProfileInput, ProfileInputProps} from "../profileInput/ProfileInput";
import {collectInputsData} from "../../../../scripts/content/handlers/FormHandler";

export interface ProfileFormProps {
    inputs: ProfileInputProps[];
    formId: string;
    events?: {}

}

export  class ProfileForm extends Block {
    constructor(props: ProfileFormProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            submit: (event) => {
                collectInputsData(event);

            }
        };
        this.children.inputs = this.props.inputs?.map((props) => new ProfileInput(props));


    }
    render() {
        return this.compile(template, this.props);
    }
}
