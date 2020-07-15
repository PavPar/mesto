const popupArray = Array.from(document.querySelectorAll('.popup'));//массив со всеми popup

const cardsArea = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template"); //шаблон для карты

const profile = document.querySelector(".profile");

const profileContent = {
    btnEdit: profile.querySelector(".profile__button_type_edit"),
    btnAdd: profile.querySelector(".profile__button_type_add"),
    title: profile.querySelector(".profile__title"),
    subtitle: profile.querySelector(".profile__subtitle")
};

const popupCard = document.querySelector('.popup-card'); //Получаем PopUp на странице

const popupCardContent = {
    btnExit: popupCard.querySelector(".popup__button_type_exit"),
    btnSave: popupCard.querySelector(".popup__button_type_save"),
    title: popupCard.querySelector('.popup__title'),
    firstInput: popupCard.querySelector('.popup__input-card-title'),
    secondInput: popupCard.querySelector('.popup__input-card-link'),
    form: popupCard.querySelector('.popup__window'),
}

const popupProfile = document.querySelector('.popup-profile'); //Получаем PopUp на странице

const popupProfileContent = {
    btnExit: popupProfile.querySelector(".popup__button_type_exit"),
    btnSave: popupProfile.querySelector(".popup__button_type_save"),
    title: popupProfile.querySelector('.popup__title'),
    firstInput: popupProfile.querySelector('.popup__input-title'),
    secondInput: popupProfile.querySelector('.popup__input-subtitle'),
    form: popupProfile.querySelector('.popup__window'),
}

const popupImageZoom = document.querySelector(".popup_type-imgZoom");

const popupImageZoomContent = {
    btnExit: popupImageZoom.querySelector(".popup__button_type_exit"),
    subtitle: popupImageZoom.querySelector('.popup__subtitle'),
    image: popupImageZoom.querySelector('.popup__image')
}

const popupValidationFields = {
    form: ".popup__window",
    input: ".popup__input",
    errMsg: ".popup__errmsg",
    submitBtn: ".popup__button_type_save",
    input_errClass: "popup__input_validity-invalid",
    submitBtn_disClass: "popup__button_state-disabled"
}

//Снимает все что было поставленно на popup в процессе валидации формы
function revertForm(form) {
    const inputs = Array.from(form.querySelectorAll(popupValidationFields.input));
    const errMsg = Array.from(form.querySelectorAll(popupValidationFields.errMsg));
    const submitBtn = form.querySelector(popupValidationFields.submitBtn);

    inputs.forEach((inputElement) => {
        inputElement.classList.remove(popupValidationFields.input_errClass);
    });

    errMsg.forEach((errMsgElement) => {
        errMsgElement.textContent = "";
    });

    const isInvalid = inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    });

    if(!isInvalid){ //Убираем ограничение с кнопки если у нас в форме все правильно
        submitBtn.classList.remove(popupValidationFields.submitBtn_disClass);
        submitBtn.disabled = false;
    }
}

//Проверка что popup запущен
function isPopupActive(popup) {
    return !popup.classList.contains('popup_visibility-hidden')
}

//Переключить состояние popup
function togglePopup(popup) {
    const hasForm = popup.querySelector(popupValidationFields.form);
    if(!isPopupActive(popup) && hasForm){
        revertForm(hasForm); //Производим чистку только в случае если popup не виден (Иначе при его закрытии будет видна очистка полей)
    }
    popup.classList.toggle('popup_visibility-hidden');
    document.addEventListener('keydown', keyClosePopup);
}



//Установка новых данных profile
function setProfileData(event) {
    event.preventDefault();
    profileContent.title.textContent = popupProfileContent.firstInput.value;
    profileContent.subtitle.textContent = popupProfileContent.secondInput.value;
    togglePopup(popupProfile);
}

//Заполнение popup для profile
function fillProfilePopup() {
    popupProfileContent.firstInput.value = profileContent.title.textContent;
    popupProfileContent.secondInput.value = profileContent.subtitle.textContent;
}


//Отображение popup для profile
function createProfilePopup() {
    fillProfilePopup();
    togglePopup(popupProfile);
}

//Заполнить приближение изображения
function fillImageZoom(img) {
    const alt = img.getAttribute("alt");
    popupImageZoomContent.subtitle.textContent = alt;
    popupImageZoomContent.image.alt = alt;
    popupImageZoomContent.image.src = img.src;
}

//Приблизить изображение
function zoomImage(event) {
    fillImageZoom(event.target);
    togglePopup(popupImageZoom);
}

//Поставить лайк карточке вер_2
function cardLike(event) {
    if (event.target.classList.contains('card__button_type-like')) {
        event.target.classList.toggle('card__button_state-selected');
    }
}

//Удаление карты 
function cardDelete(event) {
    const card = event.target.closest('.card');
    card.querySelector('.card__image').removeEventListener('click', zoomImage);
    cardsArea.removeChild(card);
}

//Создание новой карты
function createCard(title, imageLink, alt = title) {
    const newCard = cardTemplate.content.cloneNode(true).querySelector(".card");

    newCard.querySelector('.card__title').textContent = title;

    const image = newCard.querySelector('.card__image');
    image.src = imageLink;
    image.alt = alt;
    image.addEventListener('click', zoomImage)

    // newCard.querySelector('.card__button_type-like').addEventListener('click', cardLike);
    newCard.querySelector('.card__button_type-delete').addEventListener('click', cardDelete, { once: true });

    return newCard;
}

//Добавление карты в грид на последнию позицию
function appendCardLast(Card) {
    cardsArea.appendChild(Card);
}

//Добавление карты в грид на первую позицию
function appendCardFirst(Card) {
    cardsArea.insertBefore(Card, cardsArea.firstChild)
}

//Отображения popup для card
function createCardPopup() {
    togglePopup(popupCard);
}

//Добавление новой карточки в блок карт
function addNewCard(event) {
    event.preventDefault()
    appendCardFirst(createCard(popupCardContent.firstInput.value, popupCardContent.secondInput.value));
    togglePopup(popupCard);
    popupCardContent.form.reset();//Очистка формы
}

function closePopupCard(e) {
    e.preventDefault();
    togglePopup(popupCard);
}

function closePopupProfile(e) {
    e.preventDefault();
    togglePopup(popupProfile);
}

function closePopupImgZoom(e) {
    e.preventDefault();
    togglePopup(popupImageZoom);
}

//Закрыть popup клавишей
function keyClosePopup(evt) {
    if (evt.key === "Escape") {
        popupArray.forEach((popupElement) => {
            if (isPopupActive(popupElement)) {
                togglePopup(popupElement);
                document.removeEventListener('keydown', keyClosePopup);
                return;
            }
        });
    }
}

//Закрыть popup кликом по фону
function backgrndClosePopup(evt) {
    if (evt.target.classList.contains("popup")) {
        togglePopup(evt.target);
    }
}

profileContent.btnEdit.addEventListener("click", createProfilePopup);
profileContent.btnAdd.addEventListener("click", createCardPopup);

popupProfileContent.btnExit.addEventListener("click", closePopupProfile);
popupProfile.addEventListener('submit', setProfileData);

popupCardContent.btnExit.addEventListener("click", closePopupCard);
popupCard.addEventListener('submit', addNewCard);

popupImageZoomContent.btnExit.addEventListener('click', closePopupImgZoom);
cardsArea.addEventListener('click', cardLike);


popupArray.forEach((popupElement) => {
    popupElement.addEventListener('click', backgrndClosePopup);
});

//Добавление базовых карточек на страницу. Массив с карточками в файле startupCardsArray.js
initialCards.forEach((element) => {
    appendCardLast(createCard(element.title, element.src));
});