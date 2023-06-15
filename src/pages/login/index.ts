import {Form, FormProps} from "../../modules/components/form/form";
import {withLoginPage} from "./WithLoginPage";
import {withStore} from "../../scripts/utils/withStore";


export class Login extends Form {
    constructor(props: FormProps) {
        super(props);
    }



}


export default withStore(withLoginPage(Login));
