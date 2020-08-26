/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:

    Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

*/

export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    setUserInfo({ userName, userInfo }) {
        this._userNameElement.textContent = userName;
        this._userInfoElement.textContent = userInfo;
    }

    getUserInfo() {
        return {
            userName: this._userNameElement.textContent,
            userInfo: this._userInfoElement.textContent
        };
    }

    setUserAvatar(avatarUrl) {
        this._userAvatarElement.src = avatarUrl;
    }
}