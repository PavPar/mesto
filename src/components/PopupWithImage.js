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
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(popupConst.imageSelector);
        this._subtitle = this._popup.querySelector(popupConst.subtitleSelector);
    }
    
    open() {
        const alt = this._image.getAttribute("alt");
        this._subtitle.textContent = alt;
        popupConst.image.alt = alt;
        popupConst.image.src = this._image.src;
        super.open();
    }
}