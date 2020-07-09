const popupArray = Array.from(document.querySelectorAll('.popup'));//массив со всеми popup

const cardsArea = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template"); //шаблон для карты

const profile = document.querySelector(".profile");

const profileContent = {
    btnEdit: profile.querySelector(".profile__button_type_edit"),
    btnAdd: profile.querySelector(".profile__button_type_add"),
    title: profile.querySelector(".profile__title"),
    subtitle: profile.querySelector(".profile__subtitle")
}

const popupCard = document.querySelector('.popup-card'); //Получаем PopUp на странице

const popupCardContent = {
    btnExit: popupCard.querySelector(".popup__button_type_exit"),
    btnSave: popupCard.querySelector(".popup__button_type_save"),
    inputs: popupCard.querySelectorAll(".popup__input"),
    title: popupCard.querySelector('.popup__title'),
    firstInput: popupCard.querySelector('.popup__input-card-title'),
    secondInput: popupCard.querySelector('.popup__input-card-link')
}

const popupProfile = document.querySelector('.popup-profile'); //Получаем PopUp на странице

const popupProfileContent = {
    btnExit: popupProfile.querySelector(".popup__button_type_exit"),
    btnSave: popupProfile.querySelector(".popup__button_type_save"),
    inputs: popupProfile.querySelectorAll(".popup__input"),
    title: popupProfile.querySelector('.popup__title'),
    firstInput: popupProfile.querySelector('.popup__input-title'),
    secondInput: popupProfile.querySelector('.popup__input-subtitle')
}

const popupImageZoom = document.querySelector(".popup_type-imgZoom");

const popupImageZoomContent = {
    btnExit: popupImageZoom.querySelector(".popup__button_type_exit"),
    subtitle: popupImageZoom.querySelector('.popup__subtitle'),
    image: popupImageZoom.querySelector('.popup__image')
}

function togglePopup(popup) {
    popup.classList.toggle('popup_visibility-hidden');
}

//Проверка что popup запущен
function isPopupActive(popup) {
    return !popup.classList.contains('popup_visibility-hidden')
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

// //Поставить лайк карточке 
// function cardLike(event) {
//     event.target.classList.toggle('card__button_state-selected');
// }
//Поставить лайк карточке вер_2
function cardLike() {
    if (event.target.classList.contains('card__button_type-like')) {
        event.target.classList.toggle('card__button_state-selected');
    }
}

//Удаление карты 
function cardDelete(event) {
    const card = event.target.closest('.card');
    // card.querySelector('.card__button_type-like').removeEventListener('click', cardLike);
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

//Очистка ввода данных
function clearInput(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    })
}

//Добавление новой карточки в блок карт
function addNewCard(event) {
    event.preventDefault()
    appendCardFirst(createCard(popupCardContent.firstInput.value, popupCardContent.secondInput.value));
    togglePopup(popupCard);
    clearInput([popupCardContent.firstInput, popupCardContent.secondInput]);
}

const initialCards = [
    {
        title: 'Архыз',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        src: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach((element) => {
    appendCardLast(createCard(element.title, element.src));
});


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

function keyClosePopup(evt) {
    evt.preventDefault();
    if (evt.key === "Escape") {
        popupArray.forEach((popupElement) => {
            if (isPopupActive(popupElement)) {
                togglePopup(popupElement);
                return; //Не будем проходить все popup, потому что может быть открыт только один
            }
        });
    }
}

profileContent.btnEdit.addEventListener("click", createProfilePopup);
profileContent.btnAdd.addEventListener("click", createCardPopup);

popupProfileContent.btnExit.addEventListener("click", closePopupProfile);
popupProfile.addEventListener('submit', setProfileData);

popupCardContent.btnExit.addEventListener("click", closePopupCard);
popupCard.addEventListener('submit', addNewCard);

popupImageZoomContent.btnExit.addEventListener('click', closePopupImgZoom);
cardsArea.addEventListener('click', cardLike); // Перепишем чтобы не было делегации и было меньше eventlistener-ов

document.addEventListener('keydown', keyClosePopup)// Вместо того чтобы иметь 3 event listener у нас будет один на обработку клавишы выхода

