/*
Класс FormValidator - настраивает валидацию полей формы
    принимает в конструктор объект настроек с селекторами и классами формы;+
    принимает вторым параметром элемент той формы, которая валидируется;+
    имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита,
     устанавливают все обработчики;
    имеет один публичный метод enableValidation, который включает валидацию формы.
    Для каждой проверяемой формы создайте экземпляр класса FormValidator

    Поля config:

   const popupFormClasses = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_state-disabled',
    inputErrorClass: 'popup__input_validity-invalid',
    };

*/

export default class FormValidator {
    constructor(config, form) {
        this.form = form;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
    }

    //Получить все input
    _getInputsArr() {
        return Array.from(this.form.querySelectorAll(this.inputSelector));
    }

    //Переключение состояния кнопки
    _setSubmitBtnActive(disabled) {
        disabled ?
            this.btnSubmit.classList.add(this.inactiveButtonClass) :
            this.btnSubmit.classList.remove(this.inactiveButtonClass);
        this.btnSubmit.disabled = disabled;
    }

    //Фукнция для получения поля для вывода ошибки
    _getErrMsgField(input) {
        return this.form.querySelector(`#${input.id}-errmsg`)
    }


    //Выполнить проверку формы
    _isFormInvalid() {
        return this.inputsArray.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _validateForm() {
        this._setSubmitBtnActive(this._isFormInvalid());
    }


    //Изменить стиль инпута
    _showInputError(inputElement) {
        if (!inputElement.validity.valid) {
            inputElement.classList.add(this.inputErrorClass);
        }
    }

    //Спрятать сообщение об ошибке и изменить стиль инпута
    _hideInputError(inputElement) {
        if (inputElement.validity.valid) {
            inputElement.classList.remove(this.inputErrorClass);
        }
    }

    //Показать сообщение об ошибке
    _showErrMsg(errMsgElement, msgText) {
        errMsgElement.textContent = msgText;
    }

    //Спрятать сообщение об ошибке
    _hideErrMsg(errMsgElement) {
        errMsgElement.textContent = "";
    }

    _setEventListeners() {
        this.form.addEventListener('input', () => {
            this._validateForm();
        })

        this.inputsArray.forEach((inputElement) => {
            const errMsgField = this._getErrMsgField(inputElement);

            inputElement.addEventListener('input', () => {
                if (!inputElement.validity.valid) {
                    this._showInputError(inputElement);
                    this._showErrMsg(errMsgField, inputElement.validationMessage)
                } else {
                    this._hideInputError(inputElement);
                    this._hideErrMsg(errMsgField);
                }
            });
        });
    }

    enableValidation() {
        this.inputsArray = this._getInputsArr();
        this.btnSubmit = this.form.querySelector(this.submitButtonSelector);
        this._setEventListeners();
        this._validateForm() //Первичная валидация
    }
}