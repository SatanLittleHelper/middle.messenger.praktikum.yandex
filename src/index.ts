import {Form} from "./modules/components/form/form";
import renderDOM from "./scripts/utils/renderDOM";
import {AppError} from "./modules/error/AppError";
import {Messenger} from "./modules/messenger/Messenger";
import {Profile} from "./modules/profile-page/components/profile/Profile";

window.addEventListener('DOMContentLoaded', () => {
    const loginPage = new Form({
        buttonsText: {
            mainBtn: "Log in",
            subBtn: "Sign up"
        },
        formInputs: [
            {
                events: {
                    change: () => {},
                },
                text: "Log in",
                name: "login",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "Password",
                name: "password",
                type: "password",
                error: "",
            }
        ],
        header: "Log in",
        links: {
            main: "/messenger",
            sub: "/signup"
        },
    });
    const signUpPage = new Form({
        buttonsText: {
            mainBtn: "Sign up",
            subBtn: "Log in"
        },
        formInputs: [
            {
                events: {
                    change: () => {},
                },
                text: "E-mail",
                name: "email",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "Login",
                name: "login",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "First name",
                name: "first_name",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "Second name",
                name: "second_name",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "Phone",
                name: "phone",
                type: "text",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "Password",
                name: "password",
                type: "password",
                error: "",
            },
            {
                events: {
                    change: () => {},
                },
                text: "Password",
                name: "repeat_password",
                type: "password",
                error: "",
            }
        ],
        header: "Log in",
        links: {
            main: "/messenger",
            sub: "/login"
        },
    });
    const errorPage = new AppError({
        code: "404",
        description: "Not found",
        events: {}

    });
    const messenger = new Messenger({
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
    });
    const profile = new Profile({
        control: {
            buttons: [
                {
                    text: "Edit profile",
                    link: "/edit-profile",
                    buttonRed: false,
                },
                {
                    text: "Change password",
                    link: "/change-password",
                    buttonRed: false
                },
                {
                    text: "Sign out",
                    link: "/login",
                    buttonRed: true,
                }

            ],
            saveButtons: []

        },
        profileForm: {
            formId: "change_password",
            inputs: [
                {
                    type: "password",
                    text: "Old password",
                    name: "old-password",
                    error: "",
                    events: {},
                },
                {
                    type: "password",
                    text: "New password",
                    name: "new-password",
                    error: "",
                    events: {},
                },
                {
                    type: "password",
                    text: "Repeat password",
                    name: "repeat-password",
                    error: "",
                    events: {},
                },
            ]
        }

    })
    const changePassword = new Profile({
        control: {
            buttons: [],
            saveButtons: [
                {
                link: "/profile",
            },
            ]

        },
        profileForm: {
            formId: "change_password",
            inputs: [
                {
                    type: "password",
                    text: "Old password",
                    name: "old-password",
                    error: "",
                    events: {},
                },
                {
                    type: "password",
                    text: "New password",
                    name: "new-password",
                    error: "",
                    events: {},
                },
                {
                    type: "password",
                    text: "Repeat password",
                    name: "repeat-password",
                    error: "",
                    events: {},
                },
            ]
        }

    })


    switch (window.location.pathname) {
        case "/":
            renderDOM(loginPage);
            break;
        case "/login":
            renderDOM(loginPage);
            break;
        case "/signup":
            renderDOM(signUpPage);
            break;
        case "/messenger":
            renderDOM(messenger);
            break;
        case "/profile":
            renderDOM(changePassword);
            break;
        default:
            renderDOM(errorPage);
            break;
    }

})
