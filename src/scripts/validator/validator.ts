import constants from "../constants";

let error: string;
export function validateInput(event):string {
    const inputText = event.target.value;
    const inputType = event.target.name;
    error = "";

    if (isEmpty(inputText)) {
        return error
    }
    if (inputType === constants.FIRST_NAME || inputType === constants.SECOND_NAME) {
        console.log(isDash(inputText));
        if (!isCyrillic(inputText) && !isLatin(inputText)) {
            return "Must be Cyrillic or Latin"
        }
        if (isNumber(inputText)) {
            return 'Can\' contain numbers';
        }
        if (isSpace(inputText)) {
            return 'Can\' contain space and special symbols';
            //TODO:Дописать обработку спецсимволов
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
        if (isSpace(inputText)) {
            return 'Can\' contain space and special symbols';
            //TODO:Дописать обработку спецсимволов
        }
    }

    if (inputType === constants.PHONE) {
        if (!isPhone(inputText)) {
            return 'Can be only digits, mau start from +'
        }
        if (!isSize(10, 15, inputText)) {
            return 'Must be from 10 to 15 symbols';
        }

    }  if (inputType === constants.EMAIL) {
        if (isCyrillic(inputText)) {
            return 'Can contain only latin symbol'
        }
        if (!isEmail(inputText)) {
            return 'Incorrect email address'
        }

    }

    if (inputType === constants.PASSWORD || inputType === constants.NEW_PASSWORD ||
        inputType === constants.OLD_PASSWORD || inputType === constants.REPEAT_PASSWORD) {
        console.log(isPassword(inputText));
        if (!isSize(8, 40, inputText)) {
            return 'Must be from 8 to 40 symbols';
        }
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
function isSpace(text):boolean {
    return text.match(/\s+/);
}
function isDash(text):boolean {
    return text.match(/-+/);
}

function firstSymbolIsUpperCase(text):boolean {
    return isUpperCase(text[0]);
}

function isSize(from, to, text):boolean {
    return text.length >= from && text.length <= to;

}

function isPhone(text):boolean {
    return text.match(/\d+|\+\d+/)
}

function isPassword(text:string):boolean {
    const array = text.split('');
    return !!(array.find((item) => isUpperCase(item)) &&
        array.find((item) => isNumber(item)));

}

function isUpperCase(symbol):boolean {
    return symbol.match(/[A-Z]/);
}

function isEmail(text):boolean {
    return text.match(/.+@.+\..+/);
}
