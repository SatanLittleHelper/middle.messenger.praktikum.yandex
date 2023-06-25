import template from "./addUser.hbs";
import Block from "../../../../scripts/utils/Block";
import {Input} from "../../inputs/Input";


export interface AddUserProps {
    formID: string,
    name: string,
    buttonName: string
    input?: Input

}

export class AddUser extends Block {
    constructor(props: AddUserProps) {
        super(props);

    }

    protected init() {
        this.children.input = new Input({name: "username", text: "User name", type: "text"})
    }

    render() {
        return this.compile(template, this.props);
    }
}
export default AddUser;

