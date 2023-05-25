import { SignIn } from './pages/signin';
import {Auth} from "./modules/auth-page";
import {Form} from "./modules/components/form/form";
import renderDOM from "./scripts/utils/renderDOM";
import {Input} from "./modules/components/inputs/Input";

window.addEventListener('DOMContentLoaded', () => {
    // const signin = new SignIn;
    // const auth = new Auth();
    const form = new Form({
        buttonsText: {
            mainBtn: "Log in",
            subBtn: "Sign up"
        }, formInputs: [
            {
                events: {
                    change: () => {},
                },
                text: "test",
                name: "test",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "test",
                name: "test",
                type: "password",
                error: "",
            }
        ], header: "Log in",
        links: {
            main: "/messenger",
            sub: "/signup"
        },
    });

    const input = new Input({
        error: "", events: {}, name: "login", text: "login", type: "text"

    })

   renderDOM(form);
})
