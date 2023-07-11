/* eslint-disable import/extensions,import/no-unresolved */
import { InputProps } from '../../modules/components/inputs/Input';
import { BlockClass } from '../../scripts/utils/Block';
import { FormProps } from '../../modules/components/form/form';

type WithSignupPageProps = {
    buttonsText: Record<string, string>;
    formInputs: InputProps[];
    header: string;
    links: Record<string, string>;
};

// eslint-disable-next-line import/prefer-default-export
export function withSignupPage<P extends WithSignupPageProps>(WrappedBlock: BlockClass<P>) {
  // @ts-ignore

  return class extends WrappedBlock<P> {
    constructor(props: P) {
      const signUpPageProps: FormProps = {
        formName: 'signup',
        buttonsText: {
          mainBtn: 'Sign up',
          subBtn: 'Log in',
        },
        formInputs: [
          {
            events: {},
            text: 'E-mail',
            name: 'email',
            type: 'text',
            error: '',
          },
          {
            events: {},
            text: 'Login',
            name: 'login',
            type: 'text',
            error: '',
          },
          {
            events: {},
            text: 'First name',
            name: 'first_name',
            type: 'text',
            error: '',
          },
          {
            events: {},
            text: 'Second name',
            name: 'second_name',
            type: 'text',
            error: '',
          },
          {
            events: {},
            text: 'Phone',
            name: 'phone',
            type: 'text',
            error: '',
          },
          {
            events: {},
            text: 'Password',
            name: 'password',
            type: 'password',
            error: '',
          },
          {
            events: {},
            text: 'Repeat password',
            name: 'repeat_password',
            type: 'password',
            error: '',
          },
        ],
        header: 'Sign up',
        links: {
          sub: '/',
        },
        events: {},
      };

      super({ props, ...signUpPageProps });
    }
  } as BlockClass<Omit<P, 'SignupPage'>>;
}
