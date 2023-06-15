import Block from "../../../../scripts/utils/Block";
import template  from "./profile.hbs";
import {ProfileForm, ProfileFormProps} from "../profileForm/ProfileForm";
import {Controls, ControlsProps} from "../controls/Controls";
import {ProfileInformation, ProfileInformationProps} from "../profileInformation/ProfileInformation";
// import store, { StoreEvents } from '../../../../scripts/utils/store';


export interface ProfileProps {
    control: ControlsProps;
    profileForm?: ProfileFormProps;
    profileInformation?: ProfileInformationProps;

}

export  class Profile extends Block {
    constructor(props: ProfileProps) {
        super(props);

        // UserController.getUser();

        // store.on(StoreEvents.Updated, () => {
        //     this.setProps(store.getState());
        // });
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
