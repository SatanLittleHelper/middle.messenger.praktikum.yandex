/* eslint-disable import/extensions,import/no-unresolved */
import Form, { FormProps } from '../../modules/components/form/form';
import { withLoginPage } from './WithLoginPage';

class Login extends Form {
  constructor(props: FormProps) {
    super(props);
  }
}

// @ts-ignore
export default withLoginPage(Login);
