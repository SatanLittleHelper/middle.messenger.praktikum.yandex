import {InputProps} from "../../modules/components/inputs/Input";
import {BlockClass} from "../../scripts/utils/Block";

type WithLoginPageProps = {
    buttonsText: Record<string, string>;
    formInputs: InputProps[];
    header: string;
    links: Record<string, string>;
}

export function withLoginPage<P extends WithLoginPageProps>(WrappedBlock: BlockClass<P>) {
    return class extends WrappedBlock<P> {
        constructor(props: P) {
            Object.assign(props, {
                buttonsText: {
                    mainBtn: "Log in",
                    subBtn: "Sign up"
                },
                formInputs: [
                    {
                        events: {},
                        text: "Log in",
                        name: "login",
                        type: "text",
                        error: "",
                    },
                    {
                        events: {},
                        text: "Password",
                        name: "password",
                        type: "password",
                        error: "",
                    }
                ],
                header: "Log in",
                links: {
                    main: "/messenger",
                    sub: "/signup"
                },
            });
            console.log("call")
            super(props);

        }


    } as BlockClass<Omit<P, 'LoginPage'>>;
}
