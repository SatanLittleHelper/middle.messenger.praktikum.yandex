/* eslint-disable import/extensions,import/no-unresolved */
import template from './uploadFile.hbs';
import Block from '../../../../scripts/utils/Block';
import { Input } from '../../inputs/Input';

export interface UploadFileProps {
    formID: string,
    name: string,
    buttonName: string
    input?: Input
}

export class UploadFile extends Block {
  constructor(props: UploadFileProps) {
    super(props);
  }

  protected init() {
    this.children.input = new Input({
      name: 'avatar',
      text: '',
      type: 'file',
      class_name: 'modal__form__content__upload-input',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default UploadFile;
