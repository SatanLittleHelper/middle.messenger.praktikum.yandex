/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../../../scripts/utils/Block';
import template from './controls.hbs';

export interface ControlsProps {
    saveButtons?: ProfileSaveButtonsProps[];
    buttons?: ProfileButtonsProps[];
}

export interface ProfileButtonsProps {
    name: string;
    formID?: string;
    text: string;
    buttonRed: boolean;
    events?: {};

}

export interface ProfileSaveButtonsProps {
    name: string;
    formID: string;
}

export class Controls extends Block {
  constructor(props: ControlsProps) {
    super(props);
  }

  protected init() {

  }

  render() {
    return this.compile(template, this.props);
  }
}
