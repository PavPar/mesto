/*
Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
*/
import Popup from './Popup.js';

const popupConst = {
    subtitleSelector: '.popup__subtitle',
    imageSelector: '.popup__image'
}

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageData) {
        super(popupSelector);
        this._imageElement = this.popup.querySelector(popupConst.imageSelector);
        this._subtitleElement = this.popup.querySelector(popupConst.subtitleSelector);
    }

    open({ title = "", src = "" }) {
        this._subtitleElement.textContent = title;
        this._imageElement.alt = title;
        this._imageElement.src = src;
        super.open();
    }
}