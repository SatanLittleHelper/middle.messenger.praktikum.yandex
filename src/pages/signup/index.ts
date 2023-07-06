import Form, { FormProps} from "../../modules/components/form/form";
import {withSignupPage} from "./WithSignupPage";


 class Signup extends Form {
    constructor(props: FormProps) {
        super(props);
    }
}


// @ts-ignore
export default withSignupPage(Signup);
