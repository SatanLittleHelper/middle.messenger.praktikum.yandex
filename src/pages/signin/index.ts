import Block from "../../scripts/utils/block";
import template  from "./index.hbs";
import {Auth} from "../../modules/auth-page";

interface SignInProps {
    title: string;
}
export class SignIn extends Block {
    constructor() {
        super();


    }

    render() {
        return this.compile(template, {});
    }
}
