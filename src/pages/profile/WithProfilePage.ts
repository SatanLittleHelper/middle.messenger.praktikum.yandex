import {BlockClass} from "../../scripts/utils/Block";
import {ProfileProps} from "../../modules/profile-page/components/profile/Profile";

type WithProfilePageProps = {
    control: Record<string, string>;
    profileInformation: Record<string, any>;
}

export function withProfilePage<P extends WithProfilePageProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified number of type arguments

    return class extends WrappedBlock<P> {
        constructor(props: P) {
            const profilePageProps: ProfileProps = {
                control: {
                    buttons: [
                        {
                            text: "Edit profile",
                            name: "editProfile",
                            buttonRed: false,
                        },
                        {
                            text: "Change password",
                            name: "changePassword",
                            buttonRed: false
                        },
                        {
                            text: "Sign out",
                            name: "logout",
                            buttonRed: true,
                        }

                    ],

                },
                profileInformation: {
                    fields: [
                        {
                            text: "E-mail",
                            name: "email"
                        },
                        {
                            text: "Login",
                            name: "login"
                        },
                        {
                            text: "First name",
                            name: "first_name"
                        },
                        {
                            text: "Second name",
                            name: "second_name"
                        },
                        {
                            text: "Display name",
                            name: "display_name"
                        },
                        {
                            text: "Phone",
                            name: "phone"
                        },
                    ],
                },
            }

            super({props, ...profilePageProps});

        }


    } as BlockClass<Omit<P, 'WithProfilePage'>>;
}
