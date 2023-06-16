import {InputProps} from "../../modules/components/inputs/Input";
import {BlockClass} from "../../scripts/utils/Block";
import {FormProps} from "../../modules/components/form/form";

type WithLoginPageProps = {
    buttonsText: Record<string, string>;
    formInputs: InputProps[];
    header: string;
    links: Record<string, string>;
}

export function withLoginPage<P extends WithLoginPageProps>(WrappedBlock: BlockClass<P>) {
    return class extends WrappedBlock<P> {
        constructor(props: P) {
            const loginPageProps: FormProps = {
                formName: "signIn",
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
                    sub: "/signup"
                }

            }

            super({props, ...loginPageProps});

        }


    } as BlockClass<Omit<P, 'LoginPage'>>;
}
