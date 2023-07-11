/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './profileForm.hbs';
import { ProfileInput, ProfileInputProps } from '../profileInput/ProfileInput';
import { submitHandler } from '../../../../scripts/content/handlers/FormHandler';
import { formHasError } from '../../../../scripts/content/validator/validator';
import { withStore } from '../../../../scripts/utils/withStore';

export interface ProfileFormProps {
    inputs: ProfileInputProps[];
    formID: string;
    events?: {};
    formName: string;

}

export class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    super(props);
  }

  protected init() {
    const { user } = this.props.store.state;

    this.props.inputs?.forEach((item: HTMLInputElement) => {
      item.value = user[item.name];
    });
    this.props.events = {
      submit: (event: Event) => {
        event.preventDefault();
        if (!formHasError(this)) {
          submitHandler(event);
        }
      },
    };
    this.children.inputs = this.props.inputs?.map((props: ProfileInputProps) => new ProfileInput(props));
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(ProfileForm);
