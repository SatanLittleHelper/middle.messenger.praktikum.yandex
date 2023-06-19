import PathRouter from "./scripts/utils/Router/Router";
import {AppError} from "./modules/error/AppError";
import {Messenger} from "./modules/messenger/Messenger";
import {Store} from "./scripts/utils/store";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";

export const router = new PathRouter('#app')
const errorPageProps = {
    code: "404",
    description: "Not found",
    events: {}

}
const messengerPageProps = {
    messengerMainWindow: {
        messageDate: "11:23",
        messages: [
            {
                text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
                time: "11:56",
                sendByYou: false,
                events: {},

            },
            {
                text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
                time: "11:56",
                sendByYou:false,
                events: {},

            },
            {
                text: "Круто!",
                time: "12:00",
                sendByYou: true,
                events: {}
            }

        ]
    },
    sidebar: {
        dialogs: [
            {
                events: {},
                text: "kkkk",
                sendByYou: false,
                time: "11:11",
                unreadCount: 5,
                username: "Alfaf"

            },
            {
                events: {},
                text: "kkkasfasfasfasfasfasfkkkkasfasfasfasfasfasfkkkkasfasfasfasfasfasfkkkasfasfasfasfasfasfkkkkasfasfasfasfasfasfk",
                sendByYou: true,
                time: "11:11",
                unreadCount: 1,
                username: "Alfaf"

            },
            {
                events: {},
                text: "kkkk",
                sendByYou: false,
                time: "11:11",
                unreadCount: 0,
                username: "Alfaf"

            },
            {
                events: {},
                text: "kkkk",
                sendByYou: false,
                time: "11:11",
                unreadCount: 5,
                username: "Alfaf"

            },
        ]}
}

export function initRouter(store: Store<any>) {
    router
        .use({
            pathname: '/login',
            block: Login,
            exact: true,
            needAuth: false,
            onUnautorized(): void {
            },
            props: {},
            redirectPath: ""
        })
        .use({
            pathname: '/',
            block: Messenger,
            exact: true,
            needAuth: true,
            onUnautorized: () => Boolean(store?.getState()?.user?.id),
            props: messengerPageProps,
            redirectPath: "/login"
        })
        .use({
            pathname: '/signup',
            block: Signup,
            exact: true,
            needAuth: false,
            onUnautorized(): void {
            },
            props: {},
            redirectPath: ""
        })
        .use({
            pathname: '/messenger',
            block: Messenger,
            exact: true,
            needAuth: true,
            onUnautorized: () => Boolean(store?.getState()?.user?.id),
            props: messengerPageProps,
            redirectPath: "/login"
        })
        .use({
            pathname: '/profile',
            block: Profile,
            exact: true,
            needAuth: true,
            onUnautorized: () => Boolean(store?.getState()?.user?.id),
            redirectPath: "/login"
        })
        .use({
            pathname: '/*',
            block: AppError,
            exact: true,
            needAuth: false,
            onUnautorized(): void {
            },
            props: errorPageProps,
            redirectPath: "/error"
        }).start();
}
