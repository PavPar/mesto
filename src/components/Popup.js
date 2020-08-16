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
    }

    open() {
        this.popup.classList.remove(popupConst.popupHiddenClass);
    }

    close() {
        this.popup.classList.add(popupConst.popupHiddenClass);
    }

    setEventListeners() {
        document.addEventListener('keydown', evt => {
            this._handleEscClose(evt.key);
        });

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

    _handleEscClose(key) {
        if (key === "Escape" &&  !this.popup.classList.contains(popupConst.popupHiddenClass)) {
            this.popup.classList.add(popupConst.popupHiddenClass);
        }
    }
}