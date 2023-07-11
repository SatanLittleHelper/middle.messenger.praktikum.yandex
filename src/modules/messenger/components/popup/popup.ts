/* eslint-disable import/extensions,import/no-unresolved */
import template from './popup.hbs';
import Block from '../../../../scripts/utils/Block';
import './styles.pcss';

export interface PopupProps {
    buttons: Array<PopupButtonsProps>;
    events?: {};
}

export interface PopupButtonsProps {
    name: string;
    text: string;
}

export class Popup extends Block {
  constructor(props: PopupProps) {
    super(props);
  }

  protected init() {
    this.props.events = {
      click: (event: Event) => {
        if (event.target === this.element || event.target instanceof HTMLButtonElement) {
          this.hide();
        }
      },
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}
