import Block from "../../../../scripts/utils/Block";
import template  from "./profile.hbs";
import ProfileForm, {ProfileFormProps} from "../profileForm/ProfileForm";
import {Controls, ControlsProps} from "../controls/Controls";
import {ProfileInformation, ProfileInformationProps} from "../profileInformation/ProfileInformation";
import {withStore} from "../../../../scripts/utils/withStore";
import {handleButtonClick} from "../../../../scripts/content/handlers/ButtonsHandler";
import {Modal, ModalProps} from "../../../components/modal/Modal";
import {PROFILE_STATE} from "../../../../scripts/constant";
import "../../styles.pcss"


export interface ProfileProps {
    displayName?: string;
    control: ControlsProps;
    profileForm?: ProfileFormProps;
    profileInformation?: ProfileInformationProps;
    modal?: Modal;
    events?: {};

}

const changePasswordPageProps: ProfileProps = {
    control: {
        buttons: [{
            name: 'cancel',
            text: 'Cancel',
            buttonRed: true
        }],
        saveButtons: [
            {
                formID: "changePassword",
                name: "changePassword",
            },
        ]

    },
    profileForm: {
        formName: "changePassword",
        formID: "changePassword",
        inputs: [
            {
                type: "password",
                text: "Old password",
                name: "oldPassword",
                error: "",
                value: "",
                events: {},
            },
            {
                type: "password",
                text: "New password",
                name: "newPassword",
                error: "",
                value: "",
                events: {},
            },
            {
                type: "password",
                text: "Repeat password",
                name: "repeatPassword",
                error: "",
                value: "",
                events: {},
            },
        ]
    }

}
const editProfilePageProps: ProfileProps = {
    control: {
        buttons: [{
            name: 'cancel',
            text: 'Cancel',
            buttonRed: true
        }],
        saveButtons: [
            {
                formID: "change_profile_information",
                name: "saveProfile",
            },
        ]

    },
    profileForm: {
        formName: "editProfile",
        formID: "change_profile_information",
        inputs: [
            {
                type: "text",
                text: "E-mail",
                name: "email",
                error: "",
                events: {},
            },
            {
                type: "text",
                text: "Login",
                name: "login",
                error: "",
                events: {},
            },
            {
                type: "text",
                text: "First name",
                name: "first_name",
                error: "",
                events: {},
            },
            {
                type: "text",
                text: "Second name",
                name: "second_name",
                error: "",
                events: {},
            },
            {
                type: "text",
                text: "Display name",
                name: "display_name",
                error: "",
                events: {},
            },
            {
                type: "tel",
                text: "Phone",
                name: "phone",
                error: "",
                events: {},
            },
        ]
    },

}



const changeAvatarModalProps: ModalProps = {uploadFile:{
        formID: 'changeAvatar',
        buttonName: "uploadAvatar",
        name: 'changeAvatar'
    }}
export class Profile extends Block {


    constructor(props: ProfileProps) {
        super(props);

    }

    protected init() {
        this.preparePage();
    }

    render() {

        this.changeState();
        return this.compile(template, this.props);
    }
    preparePage() {
        const user = this.props.store.state.user;
        this.props.displayName = user.display_name? user.display_name: user.first_name;

        this.props.profileInformation?.fields.forEach((item: HTMLInputElement) => {
            item.value = user[item.name];
        })

        this.children.control = new Controls(<ControlsProps> this.props.control);
        if (this.props.profileForm) {
            this.children.profileForm = new ProfileForm(<ProfileFormProps> this.props.profileForm);

        }
        if (this.props.profileInformation) {
            this.children.profileInformation = new ProfileInformation(<ProfileInformationProps>
                this.props.profileInformation);

        }

        this.props.events = {
            click: (event: Event) => {
                handleButtonClick(<HTMLButtonElement>event.target);
            },
        }
    }
    changeState() {
        if(this.props.store.state?.profileState === PROFILE_STATE.EDIT_PROFILE) {
            this.changeProps(editProfilePageProps);

        }
        if(this.props.store.state?.profileState === PROFILE_STATE.CHANGE_PASSWORD) {
            this.changeProps(changePasswordPageProps);

        }
        if(this.props.store.state?.profileState === PROFILE_STATE.CHANGE_AVATAR) {
            this.children.modal = new Modal(changeAvatarModalProps);

        }
    }

    changeProps(props: ProfileProps) {
        this.children = {}
        this.props = {store:{...this.props.store}, ...props}
        this.preparePage();
    }

}

export default withStore(Profile);
