/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:

    Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

*/

export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
        this._userData = {}; //Инициализируем пустой объект userData;
    }

    setUserInfo({name,info}){
        this._userData = {name:name,info: info};
        this._userNameElement.textContent = this._userData.name;
        this._userInfoElement.textContent = this._userData.info;
    }

    getUserInfo(){
        return this._userData;
    }
}