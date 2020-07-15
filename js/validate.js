//Получить все input
function getInputsArr(form, inputClass) {
    return Array.from(form.querySelectorAll(inputClass));
}

//Получить объект формы со всеми необходимыми элементами
function getFormContent(form, inputClass, btnSubmitClass) {
    return {
        form: form,
        inputs: getInputsArr(form, inputClass),
        btnsubmit: form.querySelector(btnSubmitClass)
    };
}


//Переключение состояния кнопки
function switchBtn(btn, btnDisableClass, disabled) {
    disabled ?
        btn.classList.add(btnDisableClass) :
        btn.classList.remove(btnDisableClass);
    btn.disabled = disabled;
}

//Фукнция для получения поля для вывода ошибки
function getErrMsgField(form, input) {
    return form.querySelector(`#${input.id}-errmsg`)
}

//Bзменить стиль инпута
function showInputError(inputElement, inputErrClass) {
    if (inputElement.validity.valid) {
        inputElement.classList.add(inputErrClass);
    }
}

//Показать сообщение об ошибке
function showErrMsg(errMsgElement, msgText) {
    errMsgElement.textContent = msgText;
}

//Спрятать сообщение об ошибке и изменить стиль инпута
function hideInputError(inputElement, inputErrClass) {
    if (inputElement.validity.valid) {
        inputElement.classList.remove(inputErrClass);
    }
}

//Спрятать сообщение об ошибке
function hideErrMsg(errMsgElement) {
    errMsgElement.textContent = "";
}


//Выполнить проверку формы и влкючить/отключить кнопку
function validateForm(inputsArray, btnSubmit, btnDisableClass) {
    const isInvalid = inputsArray.some((inputElement) => {
        return !inputElement.validity.valid;
    });

    if (isInvalid) {
        switchBtn(btnSubmit, btnDisableClass, true);
    } else {
        switchBtn(btnSubmit, btnDisableClass, false);
    }
}

//Добавить каждому полю проверку
function setInputValidation(inputElement, inputErrClass, errMsgElement) {
    inputElement.addEventListener('input', () => {
        if (!inputElement.validity.valid) {
            showInputError(inputElement, "arse");
            showErrMsg(errMsgElement, inputElement)
        } else {
            hideInputError(inputElement, inputErrClass);
            hideErrMsg(errMsgElement)
        }
    })
}


function enableValidation(popupElement, { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
    const form = popupElement.querySelector(formSelector);
    const formContent = getFormContent(form, inputSelector, submitButtonSelector);

    form.addEventListener('input', () => {
        validateForm(formContent.inputs, formContent.btnsubmit, inactiveButtonClass);
    })

    formContent.inputs.forEach((inputElement) => {
        setInputValidation(inputElement, inputErrorClass, getErrMsgField(form,inputElement));
    })

    validateForm(formContent.inputs, formContent.btnsubmit, inactiveButtonClass);//Первичная валидация
}

enableValidation(document.querySelector('.popup-card'), {
    formSelector: '.popup__window',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_state-disabled',
    inputErrorClass: 'popup__input_validity-invalid',
});

enableValidation(document.querySelector('.popup-profile'), {
    formSelector: '.popup__window',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_state-disabled',
    inputErrorClass: 'popup__input_validity-invalid',
});


