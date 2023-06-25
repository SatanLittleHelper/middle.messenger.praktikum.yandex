import Block from "../../../scripts/utils/Block";
import {submitHandler} from "../../../scripts/content/handlers/FormHandler";
import template from "./modal.hbs";
import {withStore} from "../../../scripts/utils/withStore";
import {UploadFile, UploadFileProps} from "./forms/uploadFile";
import {AddUser, AddUserProps} from "./forms/addUser";
import {validateInput} from "../../../scripts/content/validator/validator";


export interface ModalProps {
    uploadFile?: UploadFileProps;
    addUser?: AddUserProps;
    events?: {},
}

export class Modal extends Block {
    constructor(props: ModalProps) {
        super(props);

    }

    protected init() {
        if(this.props.uploadFile) {
            this.children.uploadFile = new UploadFile({...this.props.uploadFile});
        }
        if (this.props.addUser) {
            this.children.addUser = new AddUser({...this.props.addUser})
        }
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                const addUserInputError = validateInput(this.children.addUser?.children.input.getContent().querySelector('input') as HTMLInputElement);
                const uploadFileInputError = validateInput(this.children.uploadFile?.children.input.getContent().querySelector('input') as HTMLInputElement);

                if(!addUserInputError || !uploadFileInputError) {
                    submitHandler(event);
                }
                else {
                    this.children.addUser?.children.input.setProps({error: addUserInputError})
                    this.children.uploadFile?.children.input.setProps({error: addUserInputError})
                }
            },
            click: (event: Event) => {
                if (event.target === this.element?.children[0]) {
                    this.destroy();
                }

            }
        }

    }

    render() {
        return this.compile(template, this.props);
    }
}
export default withStore(Modal);

