const btnDisableClass = 'popup__button_state-disabled';
const inputErrClass = 'popup__input_validity-invalid';

//Получаем все формы popup по именам
const forms = Array.from(document.forms).filter((formElement) => {
    return formElement.name.includes('popup__');
});

//Получить все input и поля для вывода ошибки 
//Возвращает массив обЪектов [{input,errmsg}]
function getFormInputs(form) {
    const inputArray = Array.from(form.querySelectorAll('.popup__input'));
    const inputs = [];
    inputArray.forEach((inputElement) => {
        inputs.push({
            input: inputElement,
            errMsg: getErrMsgField(form, inputElement)
        })
    })
    return inputs;
}

//Получить массив форм со всеми необходимыми элементами
function getFormsContent() {
    let formsContent = [];
    forms.forEach((formElement) => {
        formsContent.push({
            form: formElement,
            inputs: getFormInputs(formElement),
            btnSave: formElement.querySelector(".popup__button_type_save")
        })
    });
    return formsContent;
}


//Переключение состояния кнопки
function switchBtn(btn, disabled) {
    disabled ?
        btn.classList.add(btnDisableClass) :
        btn.classList.remove(btnDisableClass);
    btn.disabled = disabled;
}

//Фукнция для получения поля для вывода ошибки
function getErrMsgField(form, input) {
    return form.querySelector(`#${input.id}-errmsg`)
}

//Вывести сообщение об ошибке и изменить стиль инпута
function showInputError(inputObj) {
    if (!inputObj.input.validity.valid) {
        inputObj.errMsg.textContent = inputObj.input.validationMessage;
        inputObj.input.classList.add(inputErrClass);
    }
    return false;
}

//Спрятать сообщение об ошибке и изменить стиль инпута
function hideInputError(inputObj) {
    if (inputObj.input.validity.valid) {
        inputObj.errMsg.textContent = "";
        inputObj.input.classList.remove(inputErrClass);
    }
}

//Выполнить проверку формы и влкючить/отключить кнопку
function validateForm(formСontent) {
    const isInvalid = formСontent.inputs.some((obj) => {
        return !obj.input.validity.valid;
    });

    if (isInvalid) {
        switchBtn(formСontent.btnSave, true);
    } else {
        switchBtn(formСontent.btnSave, false);
    }
}

//Добавить каждому полю проверку
function setInputValidation(formСontent) {
    formСontent.inputs.forEach((obj) => {
        obj.input.addEventListener('input', () => {
            if (!obj.input.validity.valid) {
                showInputError(obj);
                isInvalid = true;
            } else {
                hideInputError(obj);
            }
        })
    });
}

const formsContent = getFormsContent();// Получаем все элементы форм

//Назначаем каждой форме 
formsContent.forEach((formContentElement) => {
    formContentElement.form.addEventListener('input', (evt) => {
        validateForm(formContentElement);
    })
    setInputValidation(formContentElement);
    validateForm(formContentElement);//Первичная валидация
})