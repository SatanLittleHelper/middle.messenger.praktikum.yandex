import {Login} from '../../pages/login';
import Block from './Block';

export enum Screens {
    Login = 'login',
}

const map: Record<Screens, any> = {
    [Screens.Login]: Login,
};

export const getScreenComponent = (screen: Screens): Block<any> => {
    return map[screen];
};
