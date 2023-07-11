/* eslint-disable import/extensions,import/no-unresolved */
import template from './modalWithInputText.hbs';
import Block from '../../../../scripts/utils/Block';
import { Input, InputProps } from '../../inputs/Input';

export interface ModalWithInputTextProps {
    title: string;
    formID: string,
    name: string,
    buttonName: string,
    buttonText: string,
    input: InputProps,

}

export class ModalWithInputText extends Block {
  constructor(props: ModalWithInputTextProps) {
    super(props);
  }

  protected init() {
    this.children.input = new Input(this.props.input);
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default ModalWithInputText;
