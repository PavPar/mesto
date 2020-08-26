/*
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:

    Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    Перезаписывает родительский метод setEventListeners. 
    Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
    но и добавлять обработчик сабмита формы.
    Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/

const popupSelectorConst = {
    formSelector: '.popup__window',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
};

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitAction) {
        super(popupSelector);
        this._submitAct = submitAction;
        this._form = this.popup.querySelector(popupSelectorConst.formSelector);
        this.submitBtn = this.popup.querySelector(popupSelectorConst.submitButtonSelector);
    }

    _getInputValues() {
        this._inputList = this.popup.querySelectorAll(popupSelectorConst.inputSelector);
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitAct(this._getInputValues())
        });
    }

    close() {
        this._form.reset();
        super.close();
    }

    //Установить текст кнопке submit
    setButtonText(text){
        this.submitBtn.textContent = text; 
    }
}