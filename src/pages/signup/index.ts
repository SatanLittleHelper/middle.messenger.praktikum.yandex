import Form, { FormProps} from "../../modules/components/form/form";
import {withSignupPage} from "./WithSignupPage";


 class Signup extends Form {
    constructor(props: FormProps) {
        super(props);
    }
}


export default withSignupPage(Signup);
