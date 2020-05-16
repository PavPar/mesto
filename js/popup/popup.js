const page = document.querySelector(".page");
const cardsArea = document.querySelector(".cards");

const profile = document.querySelector(".profile");

const profileContent = {
    btnEdit: profile.querySelector(".profile__button_type_edit"),
    btnAdd: profile.querySelector(".profile__button_type_add"),
    title: profile.querySelector(".profile__title"),
    subtitle: profile.querySelector(".profile__subtitle")
}




//----------------
const popup = document.querySelector('.popup'); //Получаем PopUp на странице

const popupContent = {
    btnExit: popup.querySelector(".popup__button_type_exit"),
    btnSave: popup.querySelector(".popup__button_type_save"),
    inputs: popup.querySelectorAll(".popup__input"),
    title: popup.querySelector('.popup__title'),
    firstInput : popup.querySelector('.popup__input-first'),
    secondInput : popup.querySelector('.popup__input-second')
}

//Показать PopUP
function showPopUp() {
    popup.style.visibility = "visible"; 
    popup.classList.remove('popup_visibility-hidden');
}

//Скрыть PopUP
function hidePopUp() {
    popup.classList.add('popup_visibility-hidden');
    popupContent.btnSave.removeEventListener("click",setProfileData,{once:true});
    popupContent.btnSave.removeEventListener("click",addNewCard,{once:true});
    clearPopUpFields();
}

//Установка новых данных profile
function setProfileData(event) {
    event.preventDefault();
    profile.querySelector(".profile__title").textContent = popupContent.firstInput.value;
    profile.querySelector(".profile__subtitle").textContent = popupContent.secondInput.value;
    hidePopUp();
}

//Очистка всех полей popup
function clearPopUpFields() {
    popupContent.inputs.forEach(element => {
        element.value = "";
        element.removeAttribute('placeholder');
    });
}

//Заполнение popup для profile
function fillProfilePopup() {
    clearPopUpFields();
    popupContent.title.textContent = "Редактировать профиль";

    popupContent.firstInput.value = profileContent.title.textContent;
    popupContent.secondInput.value = profileContent.subtitle.textContent;

    popupContent.btnExit.addEventListener('click', hidePopUp);
    popupContent.btnSave.addEventListener('click', setProfileData,{once:true});
}

//Отображение popup для profile
function createProfilePopup() {
    fillProfilePopup();
    showPopUp();
}


const cardTemplate = document.querySelector("#card-template"); //шалон для карты

//Создание новой карты
function createCard(title, imageLink, reverse = false, alt = title) {
    const newCard = cardTemplate.content.cloneNode(true).querySelector(".card");

    newCard.querySelector('.card__title').textContent = title;
    newCard.querySelector('.card__image').setAttribute('src', imageLink);
    newCard.querySelector('.card__image').setAttribute('alt', alt);

    newCard.querySelector('.card__image').addEventListener('click', zoomImage)

    newCard.querySelector('.card__button_type-like').addEventListener('click', (event) => {
        if (event.target.classList.contains('card__button_type-like')) {
            event.target.classList.toggle('card__button_state-selected');
        }
    })

    newCard.querySelector('.card__button_type-delete').addEventListener('click', (event) => {
        if (event.target.classList.contains('card__button_type-delete')) {
            cardsArea.removeChild(event.target.parentNode);
        }
    })

    return newCard
}

//Присвоение карты документу
function appendCard(Card, reverseOrder = false) {
    reverseOrder ? cardsArea.insertBefore(Card, cardsArea.firstChild) : cardsArea.appendChild(Card);
}

//Заполнение popup для card
function fillCardPopup() {
    clearPopUpFields();
    popupContent.title.textContent = "Создать карточку";

    popupContent.firstInput.setAttribute("placeholder", "Название");
    popupContent.secondInput.setAttribute("placeholder", "Ссылка на картинку");

    popupContent.btnExit.addEventListener('click', hidePopUp);
    popupContent.btnSave.addEventListener('click', addNewCard,{once:true});
}

//Отображения popup для card
function createCardPopup(){
    fillCardPopup();
    showPopUp();
}

//Добавление новой карточки в блок карт
function addNewCard(event){
    event.preventDefault()
    appendCard(createCard(popupContent.firstInput.value, popupContent.secondInput.value),true);
    hidePopUp();
    clearPopUpFields();
}

const imageZoom = document.querySelector(".image-zoom");

//Показать приближение изображения
function showImageZoom(){
    imageZoom.style.visibility = "visible"; 
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

imageZoom.classList.remove("image-zoom_visibility-invisible");
popup.classList.remove("image-zoom_visibility-invisible");
profileContent.btnEdit.addEventListener("click", createProfilePopup);
profileContent.btnAdd.addEventListener("click",createCardPopup);
