/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './profileInput.hbs';
import { validateInputTriggeredByEvent } from '../../../../scripts/content/validator/validator';

export interface ProfileInputProps {
    type: string;
    text: string;
    name: string;
    error: string;
    value?: string;
    events: {};
}

export class ProfileInput extends Block {
  constructor(props: ProfileInputProps) {
    super(props);
  }

  protected init() {
    this.props.events = {
      focusout: (event: Event) => {
        this.props.error = validateInputTriggeredByEvent(event);
        // @ts-ignore
        this.props.value = event.target?.value;
      },

    };
  }

  render() {
    return this.compile(template, this.props);
  }
}
