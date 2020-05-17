const page = document.querySelector(".page");
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
    firstInput : popupCard.querySelector('.popup__input-card-title'),
    secondInput : popupCard.querySelector('.popup__input-card-link')
}

const popupProfile = document.querySelector('.popup-profile'); //Получаем PopUp на странице

const popupProfileContent = {
    btnExit: popupProfile.querySelector(".popup__button_type_exit"),
    btnSave: popupProfile.querySelector(".popup__button_type_save"),
    inputs: popupProfile.querySelectorAll(".popup__input"),
    title: popupProfile.querySelector('.popup__title'),
    firstInput : popupProfile.querySelector('.popup__input-title'),
    secondInput : popupProfile.querySelector('.popup__input-subtitle')
}

//Показать PopUP
function showPopUp(popup) {
    popup.style.visibility = "visible"; //!!! 
    popup.classList.remove('popup_visibility-hidden');
}

//Скрыть PopUP
function hidePopUp(popup) {
    popup.classList.add('popup_visibility-hidden');
}

function hideCardPopUp(){
    hidePopUp(popupCard);
}

function hideProfilePopUp(){
    hidePopUp(popupProfile);
}

//Установка новых данных profile
function setProfileData(event) {
    event.preventDefault();
    profile.querySelector(".profile__title").textContent = popupProfileContent.firstInput.value;
    profile.querySelector(".profile__subtitle").textContent = popupProfileContent.secondInput.value;
    hideProfilePopUp();
}

//Заполнение popup для profile
function fillProfilePopup() {
    popupProfileContent.firstInput.value = profileContent.title.textContent;
    popupProfileContent.secondInput.value = profileContent.subtitle.textContent;
}


//Отображение popup для profile
function createProfilePopup() {
    fillProfilePopup();
    showPopUp(popupProfile);
}


const cardTemplate = document.querySelector("#card-template"); //шалон для карты

//Создание новой карты
function createCard(title, imageLink, reverse = false, alt = title) {
    const newCard = cardTemplate.content.cloneNode(true).querySelector(".card");

    newCard.querySelector('.card__title').textContent = title;
    
    const image = newCard.querySelector('.card__image');
    image.setAttribute('src', imageLink);
    image.setAttribute('alt', alt);
    image.addEventListener('click', zoomImage)

    newCard.querySelector('.card__button_type-like').addEventListener('click',CardLike);
    newCard.querySelector('.card__button_type-delete').addEventListener('click', CardDelete);

    return newCard;
}

function CardLike(){
    if (event.target.classList.contains('card__button_type-like')) {
        event.target.classList.toggle('card__button_state-selected');
    }
}

function CardDelete(){
    if (event.target.classList.contains('card__button_type-delete')) {
        cardsArea.removeChild(event.target.parentNode);
    }
}
//Присвоение карты документу
function appendCard(Card, reverseOrder = false) {
    reverseOrder ? cardsArea.insertBefore(Card, cardsArea.firstChild) : cardsArea.appendChild(Card);
}

//Отображения popup для card
function createCardPopup(){
    showPopUp(popupCard);
}

//Добавление новой карточки в блок карт
function addNewCard(event){
    event.preventDefault()
    appendCard(createCard(popupCardContent.firstInput.value, popupCardContent.secondInput.value),true);
    hideCardPopUp();
}

const imageZoom = document.querySelector(".image-zoom");

//Показать приближение изображения
function showImageZoom(){
    imageZoom.style.visibility = "visible"; //!!!
    imageZoom.classList.remove("image-zoom_visibility-hidden");
}

//Скрыть приближение изображения
function hideImageZoom(){
    imageZoom.classList.add("image-zoom_visibility-hidden");
    clearImageZoom();
}

//Заполнить приближение изображения
function fillImageZoom(title,img){
    
    imageZoom.querySelector('.image-zoom__btn_type-exit').addEventListener('click', hideImageZoom);
    imageZoom.querySelector('.image-zoom__title').textContent = title;
    const image = imageZoom.querySelector('.image-zoom__image');
    image.setAttribute('src', img.getAttribute("src"));
    image.setAttribute('alt', img.getAttribute("alt"));
}

//Приблизить изображение
function zoomImage(event){
    const imageParent = event.target.parentNode;
    fillImageZoom(imageParent.querySelector('.card__title').textContent,imageParent.querySelector('.card__image'));
    showImageZoom();
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
profileContent.btnAdd.addEventListener("click",createCardPopup);

popupProfileContent.btnExit.addEventListener('click', hideProfilePopUp);
popupProfileContent.btnSave.addEventListener('click', setProfileData);

popupCardContent.btnExit.addEventListener('click', hideCardPopUp);
popupCardContent.btnSave.addEventListener('click', addNewCard);
