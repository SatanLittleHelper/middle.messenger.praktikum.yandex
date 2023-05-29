import Block from "../../../../scripts/utils/block";
import  template  from "./profile.hbs";
import {ProfileForm, ProfileFormProps} from "../profileForm/ProfileForm";
import {Controls, ControlsProps} from "../controls/Controls";

export interface ProfileProps {
    control: ControlsProps;
    profileForm: ProfileFormProps

}

export  class Profile extends Block {
    constructor(props: ProfileProps) {
        super(props);
    }

    protected init() {
        this.children.control = new Controls(<ControlsProps> this.props.control);
        this.children.profileForm = new ProfileForm(<ProfileFormProps> this.props.profileForm);
    }

    render() {
        return this.compile(template, this.props);
    }
}
