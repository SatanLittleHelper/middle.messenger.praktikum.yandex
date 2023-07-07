import Block from "../../../scripts/utils/Block";
import {submitHandler} from "../../../scripts/content/handlers/FormHandler";
import template from "./modal.hbs";
import {withStore} from "../../../scripts/utils/withStore";
import {UploadFile, UploadFileProps} from "./forms/uploadFile";
import {ModalWithInputText, ModalWithInputTextProps} from "./forms/modalWithInputText";
import {validateInput} from "../../../scripts/content/validator/validator";
import "./styles.pcss"

export interface ModalProps {
    uploadFile?: UploadFileProps;
    modalWithInputText?: ModalWithInputTextProps;
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
        if (this.props.modalWithInputText) {
            this.children.modalWithInputText = new ModalWithInputText({...this.props.modalWithInputText})
        }
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                const modalWithInputTextInput = this.children.modalWithInputText?.children.input.getContent().querySelector('input');
                const uploadInput = this.children.uploadFile?.children.input.getContent().querySelector('input');
                let modalWithInputTextInputError;
                let uploadFileInputError;

                if (modalWithInputTextInput) {
                    modalWithInputTextInputError = validateInput(modalWithInputTextInput as HTMLInputElement);

                }

                if (uploadInput) {
                    uploadFileInputError = validateInput(uploadInput as HTMLInputElement);

                }
                if(!modalWithInputTextInputError && !uploadFileInputError) {

                    submitHandler(event);
                }
                else {
                    this.children.modalWithInputText?.children.input.setProps({error: modalWithInputTextInputError})
                    this.children.uploadFile?.children.input.setProps({error: uploadFileInputError})
                }
            },
            click: (event: Event) => {
                if (event.target === this.element?.children[0]) {
                    this.hide();
                }

            }
        }

    }

    render() {
        return this.compile(template, this.props);
    }
}
export default withStore(Modal);

