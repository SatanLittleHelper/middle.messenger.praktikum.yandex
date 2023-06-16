import {login} from "../../../services/auth";

enum FORM_NAME {
    SIGNIN= 'signIn',
}
export function collectInputsData(event: any) {

        const inputs = { ...event.target?.querySelectorAll('input') };
        // @ts-ignore
    const data: Array<any> = Object.values(inputs).filter(item => item.value);
        const result = Object.fromEntries(data.map((item) => [item.name, item.value]));
        return result;

     }

export function submitHandler(event: any) {
    if (event.target.name === FORM_NAME.SIGNIN) {
        window.store.dispatch(login, {data: collectInputsData(event)});
    }
}


