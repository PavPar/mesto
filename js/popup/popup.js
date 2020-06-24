const cardsArea = document.querySelector(".cards");

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

function togglePopup(popup, className) {
    popup.classList.toggle(className);
}


//Установка новых данных profile
function setProfileData(event) {
    event.preventDefault();
    profileContent.title.textContent = popupProfileContent.firstInput.value;
    profileContent.subtitle.textContent = popupProfileContent.secondInput.value;
    togglePopup(popupProfile, 'popup_visibility-hidden');
}

//Заполнение popup для profile
function fillProfilePopup() {
    popupProfileContent.firstInput.value = profileContent.title.textContent;
    popupProfileContent.secondInput.value = profileContent.subtitle.textContent;
}


//Отображение popup для profile
function createProfilePopup() {
    fillProfilePopup();
    togglePopup(popupProfile, 'popup_visibility-hidden');
}


const cardTemplate = document.querySelector("#card-template"); //шалон для карты

function CardLike(event) {
    if (event.target.classList.contains('card__button_type-like')) {
        event.target.classList.toggle('card__button_state-selected');
    }
}

function CardDelete(event) {
    if (event.target.classList.contains('card__button_type-delete')) {
        const parent = event.target.closest('.card');
        parent.querySelector('.card__button_type-like').removeEventListener('click', CardLike)
        cardsArea.removeChild(parent);
    }
}

//Создание новой карты
function createCard(title, imageLink, alt = title) {
    const newCard = cardTemplate.content.cloneNode(true).querySelector(".card");

    newCard.querySelector('.card__title').textContent = title;

    const image = newCard.querySelector('.card__image');
    image.setAttribute('src', imageLink);
    image.setAttribute('alt', alt);
    image.addEventListener('click', zoomImage)

    newCard.querySelector('.card__button_type-like').addEventListener('click', CardLike);
    newCard.querySelector('.card__button_type-delete').addEventListener('click', CardDelete, { once: true });

    return newCard;
}


//Присвоение карты документу
function appendCard(Card, reverseOrder = false) {
    reverseOrder ? cardsArea.insertBefore(Card, cardsArea.firstChild) : cardsArea.appendChild(Card);
}

//Отображения popup для card
function createCardPopup() {
    togglePopup(popupCard, 'popup_visibility-hidden');
}

//Добавление новой карточки в блок карт
function addNewCard(event) {
    event.preventDefault()
    appendCard(createCard(popupCardContent.firstInput.value, popupCardContent.secondInput.value), true);
    togglePopup(popupCard, 'popup_visibility-hidden');
}

const imageZoom = document.querySelector(".image-zoom");

//Показать приближение изображения
function showImageZoom() {
    imageZoom.classList.remove("image-zoom_visibility-invisible")
    imageZoom.classList.remove("image-zoom_visibility-hidden");
}

//Заполнить приближение изображения
function fillImageZoom(img) {

    imageZoom.querySelector('.image-zoom__title').textContent = img.getAttribute("alt");
    const image = imageZoom.querySelector('.image-zoom__image');
    image.setAttribute('src', img.getAttribute("src"));
    image.setAttribute('alt', img.getAttribute("alt"));
}

//Приблизить изображение
function zoomImage(event) {
    fillImageZoom(event.target);
    togglePopup(imageZoom, 'image-zoom_visibility-hidden');
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
    appendCard(createCard(element.title, element.src));
});

profileContent.btnEdit.addEventListener("click", createProfilePopup);
profileContent.btnAdd.addEventListener("click", createCardPopup);

popupProfileContent.btnExit.addEventListener('click', event => { event.preventDefault(); togglePopup(popupProfile, 'popup_visibility-hidden'); });
popupProfileContent.btnSave.addEventListener('click', setProfileData);

popupCardContent.btnExit.addEventListener('click', event => { event.preventDefault(); togglePopup(popupCard, 'popup_visibility-hidden'); });
popupCardContent.btnSave.addEventListener('click', addNewCard);

imageZoom.querySelector('.image-zoom__btn_type-exit').addEventListener('click', event => { event.preventDefault(); togglePopup(imageZoom, 'image-zoom_visibility-hidden'); });
