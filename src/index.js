import Card from './components/Card.js'; // Класс card для создания карточек
import FormValidator from './components/FormValidator.js'; //Класс для валидации формы
import Section from './components/Section.js'; // Класс для размещения объектов на странице
import UserInfo from './components/UserInfo.js'; //Класс для изменения пользовательской информации

import PopupWithForm from './components/PopupWithForm.js'; //Класс для управления popup с формой
import PopupWithImage from './components/PopupWithImage.js'; //Класс popup с приближением изображения

import {
    popupTypeSelectors,
    cardTemplateSelector,
    cardContainerSelector,
    formValidatorConfig,
    profileSelectors,
    initialCards
} from './utils/constants.js';

//Функция для создания карты с изображением 
function createCard(cardData) {
    const popupImage = new PopupWithImage(popupTypeSelectors.popupWImage, { title: cardData.title, src: cardData.src })
    return new Card({ title: cardData.title, src: cardData.src }, cardTemplateSelector, () => {
        popupImage.open();
    }).generateCard();
}


const cardsContainer = new Section({
    items: initialCards, renderer: (itemData) => {
        return createCard(itemData);
    }
}, cardContainerSelector);

const popupCard = new PopupWithForm(popupTypeSelectors.popupCard, (inputData) => {
    cardsContainer.addItem(createCard(inputData))
});

const profileUserInfo = new UserInfo({
    userNameSelector: profileSelectors.title,
    userInfoSelector: profileSelectors.subtitle
});

const popupProfile = new PopupWithForm(popupTypeSelectors.popupProfile, (inputData) => {
    profileUserInfo.setUserInfo(inputData);
    popupProfile.close();
});

const popupCardValidator = new FormValidator(formValidatorConfig, popupCard.popup.querySelector(formValidatorConfig.formSelector));
const popupProfileValidator = new FormValidator(formValidatorConfig, popupProfile.popup.querySelector(formValidatorConfig.formSelector));

document.querySelector(profileSelectors.btnAdd).addEventListener("click", () => { 
    popupCardValidator.enableValidation();
    popupCardValidator.hideAllValidationMessages();
    
    popupCard.open() 
});

document.querySelector(profileSelectors.btnEdit).addEventListener("click", () => {
    const userInfo = profileUserInfo.getUserInfo();
    popupProfile.popup.querySelector(profileSelectors.input_title).value = userInfo.userName;
    popupProfile.popup.querySelector(profileSelectors.input_subtitle).value = userInfo.userInfo;
    
    popupProfileValidator.enableValidation();
    popupProfileValidator.hideAllValidationMessages();
    
    popupProfile.open();
});


popupCardValidator.enableValidation();
popupProfileValidator.enableValidation();
cardsContainer.renderItems();