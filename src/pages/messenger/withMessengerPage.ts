import {BlockClass} from "../../scripts/utils/Block";
import {MessengerProps} from "../../modules/messenger/Messenger";

type WithMessengerPageProps = {
    // messengerMainWindow: Record<string, any>;
    // sidebar: Record<string, any>;

}

export function WithMessengerPage<P extends WithMessengerPageProps>(WrappedBlock: BlockClass<P>) {
    //@ts-ignore
    return class extends WrappedBlock<P> {
        constructor(props: P) {
            const messengerPageProps: MessengerProps = {
                messengerMainWindow: {
                    active: false,
                    messageDate: "",
                    messages: [
                    ]
                },
                sidebar: {
                    dialogs: [

                    ]}
            }


            super({props, ...messengerPageProps});

        }


    } as BlockClass<Omit<P, 'MessengerPage'>>;
}
