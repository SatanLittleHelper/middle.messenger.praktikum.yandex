import Block from "../../../../scripts/utils/block";
import  template  from "./ProfileInformation.hbs";
import {
    ProfileInformationField,
    ProfileInformationFieldProps
} from "../profileInformationField/ProfileInformationField";

export interface ProfileInformationProps {
    fields: ProfileInformationFieldProps[];

}

export  class ProfileInformation extends Block {
    constructor(props: ProfileInformationProps) {
        super(props);
    }

    protected init() {
        console.log(this.props);
        console.log(this.props.fields)
        this.children.fields = this.props.fields?.map((props) => new ProfileInformationField(props));
    }

    render() {
        return this.compile(template, this.props);
    }
}
