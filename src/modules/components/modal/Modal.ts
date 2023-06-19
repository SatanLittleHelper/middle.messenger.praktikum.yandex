import Block from "../../../scripts/utils/Block";
import {submitHandler} from "../../../scripts/content/handlers/FormHandler";
import template from "./modal.hbs";
import {withStore} from "../../../scripts/utils/withStore";
import {UploadFile, UploadFileProps} from "./forms/uploadFile";
import {AddUserProps} from "./forms/addUser";


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
        this.children.uploadFile = new UploadFile({...this.props.uploadFile});
        this.props.events = {
            submit: (event: Event) => {
                event.preventDefault();
                    submitHandler(event);
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

