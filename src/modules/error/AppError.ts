/* eslint-disable import/extensions,import/no-unresolved */
import Block from '../../scripts/utils/Block';
import template from './error.hbs';
import { handleButtonClick } from '../../scripts/content/handlers/ButtonsHandler';
import './styles.pcss';

export interface ErrorProps {
    code: string;
    description: string;
    events: {};
}

export class AppError extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  protected init() {
    this.props.events = {
      click: (event: Event) => {
        handleButtonClick(<HTMLButtonElement>event.target);
      },
    };
  }

  render() {
    return this.compile(template, this.props);
  }
}
