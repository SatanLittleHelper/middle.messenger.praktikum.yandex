import template from "./addUser.hbs";
import Block from "../../../../scripts/utils/Block";


export interface AddUserProps {
}

export class AddUser extends Block {
    constructor(props: AddUserProps) {
        super(props);

    }

    protected init() {
    }

    render() {
        return this.compile(template, this.props);
    }
}
export default AddUser;

