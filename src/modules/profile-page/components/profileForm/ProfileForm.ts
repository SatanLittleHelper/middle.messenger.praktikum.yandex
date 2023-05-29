import Block from "../../../../scripts/utils/block";
import  template  from "./profileForm.hbs";
import {ProfileInput, ProfileInputProps} from "../profileInput/ProfileInput";

export interface ProfileFormProps {
    inputs: ProfileInputProps[];
    formId: string

}

export  class ProfileForm extends Block {
    constructor(props: ProfileFormProps) {
        super(props);
    }

    protected init() {
    this.children.inputs = this.props.inputs?.map((props) => new ProfileInput(props));
    }

    render() {
        return this.compile(template, this.props);
    }
}
