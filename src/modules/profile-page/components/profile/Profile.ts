import Block from "../../../../scripts/utils/block";
import  template  from "./profile.hbs";
import {ProfileForm, ProfileFormProps} from "../profileForm/ProfileForm";
import {Controls, ControlsProps} from "../controls/Controls";
import {ProfileInformation, ProfileInformationProps} from "../profileInformation/ProfileInformation";

export interface ProfileProps {
    control: ControlsProps;
    profileForm?: ProfileFormProps;
    profileInformation?: ProfileInformationProps;

}

export  class Profile extends Block {
    constructor(props: ProfileProps) {
        super(props);
    }

    protected init() {
        this.children.control = new Controls(<ControlsProps> this.props.control);

        if (this.props.profileForm) {
            this.children.profileForm = new ProfileForm(<ProfileFormProps> this.props.profileForm);

        }
        if (this.props.profileInformation) {
            this.children.profileInformation = new ProfileInformation(<ProfileInformationProps>
                this.props.profileInformation);

        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
