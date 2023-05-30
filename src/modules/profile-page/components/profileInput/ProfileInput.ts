import Block from "../../../../scripts/utils/block";
import template  from "./profileInput.hbs";

export interface ProfileInputProps {
    type: string;
    text: string;
    name: string;
    error: string;
    value: string;
    events: {};
}

export  class ProfileInput extends Block {
    constructor(props: ProfileInputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
