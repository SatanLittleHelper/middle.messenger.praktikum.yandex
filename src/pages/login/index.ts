import Form, { FormProps} from "../../modules/components/form/form";
import {withLoginPage} from "./WithLoginPage";


 class Login extends Form {
    constructor(props: FormProps) {
        super(props);
    }
}


export default withLoginPage(Login);
