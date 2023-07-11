/* eslint-disable import/extensions,import/no-unresolved */
import { Form } from '../../../modules/components/form/form';
import Block from '../../utils/Block';
import { ProfileForm } from '../../../modules/profile-page/components/profileForm/ProfileForm';
import { USER } from '../../constant';

let error: string;

// @ts-ignore
export function validateInputTriggeredByEvent(event): string {
  const inputText = event.target?.value;
  const inputType = event.target?.name;
  return _validateInput(inputText, inputType);
}

export function formHasError(form: Form | ProfileForm) {
  const inputs: Array<Block> = form.children.inputs as unknown as Array<Block>;
  inputs.forEach((item) => {
    const inputElement: HTMLInputElement = item.element!.querySelector('input') as HTMLInputElement;
    const inputError = _validateInput(inputElement.value, inputElement.name);
    item.setProps({
      error: inputError,
      value: inputElement.value,
    });
  });
  _isMatchPasswords(_getPasswordInputs(inputs));

  // @ts-ignore
  const hasError = inputs.find((input) => input.props.error.length > 0);
  return !!hasError;
}

function _isMatchPasswords(passwordInputs: Block[]): boolean {
  if (passwordInputs.length === 2) {
    // @ts-ignore
    if (passwordInputs[0].props.value !== passwordInputs[1].props.value) {
      passwordInputs.forEach((item) => {
        item.setProps({
          error: 'Passwords don\'t match ',
          // @ts-ignore
          value: item.props.value,
        });
      });
      return false;
    }
  }
  if (passwordInputs.length === 3) {
    // @ts-ignore
    if (passwordInputs[0].props.value === passwordInputs[1].props.value) {
      passwordInputs.forEach((item) => {
        item.setProps({
          error: 'Old password and new password can\'t be same',
          // @ts-ignore
          value: item.props.value,
        });
      });
      return false;
    }
    passwordInputs.shift();
    // @ts-ignore
    if (passwordInputs[0].props.value !== passwordInputs[1].props.value) {
      passwordInputs.forEach((item) => {
        item.setProps({
          error: 'Passwords don\'t match ',
          // @ts-ignore
          value: item.props.value,
        });
      });
      return false;
    }
  }

  return true;
}

function _getPasswordInputs(inputs:Block[]): Block[] {
  // @ts-ignore
  return inputs.filter((item) => item.props.type === 'password');
}

export function validateInput(input:HTMLInputElement | null): string {
  if (!input) return 'Wrong type';
  return _validateInput(input?.value, input?.name);
}

function _validateInput(inputText:string, inputType:string):string {
  error = '';

  if (isEmpty(inputText)) {
    return error;
  }
  if (inputType === USER.FIRST_NAME
        || inputType === USER.SECOND_NAME
        || inputType === USER.DISPLAY_NAME
  ) {
    if (!isCyrillic(inputText) && !isLatin(inputText)) {
      return 'Must be Cyrillic or Latin';
    }
    if (isNumber(inputText)) {
      return 'Can\'t contain numbers';
    }
    if (!isNamePattern(inputText)) {
      return 'Can\'t contain space and special symbols';
    }
    if (!firstSymbolIsUpperCase(inputText)) {
      return 'First symbol must be to upper case';
    }
  }

  if (inputType === USER.LOGIN) {
    if (!isSize(3, 20, inputText)) {
      return 'Must be from 3 to 20 symbols';
    }
    if (isCyrillic(inputText)) {
      return 'Can contain only latin symbol';
    }
    if (!isLatin(inputText)) {
      return 'Can\'t contain only numbers';
    }
    if (!isLoginPattern(inputText)) {
      return 'Can\'t contain space and special symbols';
    }
  }

  if (inputType === USER.PHONE) {
    if (!isPhonePattern(inputText)) {
      return 'Can be only numbers, may start from +';
    }
    if (!isSize(10, 15, inputText)) {
      return 'Must be from 10 to 15 symbols';
    }
  }
  if (inputType === USER.EMAIL) {
    if (isCyrillic(inputText)) {
      return 'Can contain only latin symbol';
    }
    if (!isEmailPattern(inputText)) {
      return 'Incorrect email address';
    }
  }

  if (inputType === USER.PASSWORD || inputType === USER.NEW_PASSWORD
        || inputType === USER.OLD_PASSWORD || inputType === USER.REPEAT_PASSWORD) {
    if (!isSize(8, 40, inputText)) {
      return 'Must be from 8 to 40 symbols';
    }
  }
  return error;
}

function isEmpty(text:string):boolean {
  if (!text) {
    error = 'Can\'t be empty';
    return true;
  }
  return false;
}

function isCyrillic(text:string):boolean {
  return !!text.toLowerCase()
    .match(/[а-я]+/);
}

function isLatin(text:string):boolean {
  return !!text.toLowerCase()
    .match(/[a-z]+/);
}
function isNumber(text: string):boolean {
  return !!text.match(/\d+/);
}
function isLoginPattern(text: string):boolean {
  return !!text.match(/^[a-zA-Z0-9_-]*$/);
}
function isNamePattern(text: string):boolean {
  return !!text.match(/^[a-zA-Z0-9а-яА-Я-]*$/);
}

function firstSymbolIsUpperCase(text: string):boolean {
  return isUpperCase(text[0]);
}

function isSize(from:number, to:number, text: string):boolean {
  text = text.replace(/\s/g, '');
  return text.length >= from && text.length <= to;
}

function isPhonePattern(text: string):boolean {
  return !!text.replace(/\s /, '')
    .match(/\d+|\+\d+|\+\d\(\d{3}\)\d{7}/);
}

function isUpperCase(text: string):boolean {
  return !!text.match(/[A-ZА-Я]/);
}

function isEmailPattern(text: string):boolean {
  return !!text.match(/.+@.+\..+/);
}
