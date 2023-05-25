import Block from "../../scripts/utils/block";
import template  from "./auth.hbs";

interface authProps {
    title: string;
    header: string;
    formInputs: Array<Record<string, string>>;
    formPasswordInputs: Array<Record<string, string>>;
    links: Array<Record<string, string>>;
    buttonsText: Array<Record<string, string>>;
    
}
export class Auth extends Block {
    private props: Record<string, unknown>;
   
    constructor() {
        super();

    const props: { buttonsText: { mainBtn: string; subBtn: string }; formPasswordInputs: { name: string; text: string }[]; header: string; links: { sub: string; main: string }; title: string; formInputs: { name: string; text: string }[] } =
            {
                title: 'Log in',
                header: 'Log in',
                formInputs: [
                    {
                        name: "login",
                        text: "Login",
                    }
                ],
                formPasswordInputs: [
                    {
                        name: "password",
                        text: "Password"
                    }
                ],
                links: {
                    main: "/messenger",
                    sub: "/signup"

                },
                buttonsText: {
                    mainBtn: "Sign in",
                    subBtn: "Create account"
                },
            };
    }

    render() {
        return this.compile(template, this.props);
    }
}
