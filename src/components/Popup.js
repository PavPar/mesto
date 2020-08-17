/*
Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:

    Принимает в конструктор единственный параметр — селектор попапа.
    Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
*/

const popupConst = {
    popupClass: 'popup',
    popupHiddenClass: 'popup_visibility-hidden',
    popupCrossClass: 'popup__button_type_exit'
}

export default class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this.popup.classList.remove(popupConst.popupHiddenClass);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this.popup.classList.add(popupConst.popupHiddenClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        document.addEventListener('click', evt => {
            if (evt.target.classList.contains(popupConst.popupClass)) {
                this.close();
            }
        });

        this.popup.querySelector(`.${popupConst.popupCrossClass}`).addEventListener('click', evt => {
            evt.preventDefault();
            this.close();
        });
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape" && !this.popup.classList.contains(popupConst.popupHiddenClass)) {
            this.popup.classList.add(popupConst.popupHiddenClass);
        }
    }
}