import Block from "../../../../scripts/utils/Block";
import  template  from "./profileInformationField.hbs";

export interface ProfileInformationFieldProps {
    text: string;
    value: string;
    name: string;
}

export  class ProfileInformationField extends Block {
    constructor(props: ProfileInformationFieldProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
