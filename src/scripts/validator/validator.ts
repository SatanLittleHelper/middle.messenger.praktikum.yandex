import constants from "../constants";
import {Form} from "../../modules/components/form/form";
import Block from "../utils/block";

let error: string;
export function validateInputTriggeredByEvent(event):string {
    const inputText = event.target.value;
    const inputType = event.target.name;
    return _validateInput(inputText, inputType);
}

export function validateForm(form:Form) {
    const inputs:Array<Block> = form.children.inputs as Array<Block>;

    inputs.forEach((item) => {
        const inputElement:HTMLInputElement = item.element!.querySelector('input');
        const inputError = _validateInput(inputElement.value, inputElement.name);
        item.setProps({
            error: inputError,
            value: inputElement.value
        })
        console.log(inputElement);
    })
}

export function validateInput(input:HTMLInputElement): string {
    return _validateInput(input.value, input.name);
}

function _validateInput(inputText:string, inputType:string):string {
    error = "";

    if (isEmpty(inputText)) {
        return error
    }
    if (inputType === constants.FIRST_NAME || inputType === constants.SECOND_NAME) {
        if (!isCyrillic(inputText) && !isLatin(inputText)) {
            return "Must be Cyrillic or Latin"
        }
        if (isNumber(inputText)) {
            return 'Can\'t contain numbers';
        }
        if (!isNamePattern(inputText)) {
            return 'Can\'t contain space and special symbols';
        }
        if (!firstSymbolIsUpperCase(inputText)) {
            return 'First symbol must be to upper case'
        }
    }

    if (inputType === constants.LOGIN) {
        if (!isSize(3, 20, inputText)) {
            return 'Must be from 3 to 20 symbols';
        }
        if (isCyrillic(inputText)) {
            return 'Can contain only latin symbol'
        }
        if (!isLatin(inputText)) {
            return 'Can\'t contain only numbers'
        }
        if (!isLoginPattern(inputText)) {
            return 'Can\'t contain space and special symbols';
        }
    }

    if (inputType === constants.PHONE) {
        if (!isPhonePattern(inputText)) {
            return 'Can be only numbers, may start from +'
        }
        if (!isSize(10, 15, inputText)) {
            return 'Must be from 10 to 15 symbols';
        }

    }
    if (inputType === constants.EMAIL) {
        if (isCyrillic(inputText)) {
            return 'Can contain only latin symbol'
        }
        if (!isEmailPattern(inputText)) {
            return 'Incorrect email address'
        }

    }

    if (inputType === constants.PASSWORD || inputType === constants.NEW_PASSWORD ||
        inputType === constants.OLD_PASSWORD || inputType === constants.REPEAT_PASSWORD) {
        if (!isSize(8, 40, inputText)) {
            return 'Must be from 8 to 40 symbols';
        }
        console.log(isPassword(inputText));
    }
    return error;
}

function isEmpty(text):boolean {
    if (!text) {
        error = "Can't be empty";
        return true
    }
    return false;
}

function isCyrillic(text):boolean {
    return text.toLowerCase().match(/[а-я]+/) ;
}

function isLatin(text):boolean {
    return text.toLowerCase().match(/[a-z]+/);
}
function isNumber(text):boolean {
    return text.match(/\d+/);
}
function isLoginPattern(text):boolean {
    return text.match(/^[a-zA-Z0-9_-]*$/);
}
function isNamePattern(text):boolean {
    return text.match(/^[a-zA-Z0-9а-яА-Я-]*$/);
}

function firstSymbolIsUpperCase(text):boolean {
    return isUpperCase(text[0]);
}

function isSize(from, to, text):boolean {
    text = text.replace(/\s/g,'');
    return text.length >= from && text.length <= to;

}

function isPhonePattern(text):boolean {
    return text.replace(/\s /,'').match(/\d+|\+\d+|\+\d\(\d{3}\)\d{7}/)
}

function isPassword(text:string):boolean {
    return !!text.match(/[A-Z]/) && !!text.match(/[0-9]+/);

}

function isUpperCase(text):boolean {
    return text.match(/[A-ZА-Я]/);
}

function isEmailPattern(text):boolean {
    return text.match(/.+@.+\..+/);
}
