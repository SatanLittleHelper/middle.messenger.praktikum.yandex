import template from "./uploadFile.hbs";
import Block from "../../../../scripts/utils/Block";


export interface UploadFileProps {
    formID: string,
    name: string,
    buttonName: string
}

export class UploadFile extends Block {
    constructor(props: UploadFileProps) {
        super(props);

    }

    protected init() {
    }

    render() {
        return this.compile(template, this.props);
    }
}
export default UploadFile;

