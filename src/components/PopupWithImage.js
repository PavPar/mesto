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
        this._imageElement = this._popup.querySelector(popupConst.imageSelector);
        this._subtitleElement = this._popup.querySelector(popupConst.subtitleSelector);
        this._imageData = imageData;
        this._setEventListeners();
    }

    open() {
        this._subtitleElement.textContent = this._imageData.title;
        this._imageElement.alt = this._imageData.title;
        this._imageElement.src = this._imageData.src;
        super.open();
    }
}