import Card from './components/Card.js'; // Класс card для создания карточек
import FormValidator from './components/FormValidator.js'; //Класс для валидации формы
import initialCards from './utils/startupCardsArray.js'; // Модуль с первичными карточками
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

//----------

const popupTypeSelectors = {
    popupProfile: '.popup-profile',
    popupWImage: ".popup_type-imgZoom",
    popupCard: '.popup-card'
}

const cardTemplateSelector = '#card-template';
const cardContainerSelector = ".cards";

const formValidatorConfig = {
    formSelector: '.popup__window',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_type_save',
    inactiveButtonClass: 'popup__button_state-disabled',
    inputErrorClass: 'popup__input_validity-invalid',
};

const profileSelectors = {
    btnEdit: ".profile__button_type_edit",
    btnAdd: ".profile__button_type_add",
    title: ".profile__title",
    subtitle: ".profile__subtitle",
    input_title:".popup__input-title",
    input_subtitle:".popup__input-subtitle"
};

//-----

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

const profileUserInfo = new UserInfo({ userNameSelector: profileSelectors.title, userInfoSelector: profileSelectors.subtitle });

const popupProfile = new PopupWithForm(popupTypeSelectors.popupProfile, (inputData) => {
    profileUserInfo.setUserInfo(inputData);
    popupProfile.close();
});

const popupCardFormValidator = new FormValidator(formValidatorConfig, popupCard.popup.querySelector(formValidatorConfig.formSelector));
const popupProfileFormValidator = new FormValidator(formValidatorConfig, popupProfile.popup.querySelector(formValidatorConfig.formSelector));

popupCardFormValidator.enableValidation();
popupProfileFormValidator.enableValidation();

document.querySelector(profileSelectors.btnAdd).addEventListener("click", () => { popupCard.open() });

document.querySelector(profileSelectors.btnEdit).addEventListener("click", () => {
    const userInfo = profileUserInfo.getUserInfo();
    popupProfile.popup.querySelector(profileSelectors.input_title).value = userInfo.userName;
    popupProfile.popup.querySelector(profileSelectors.input_subtitle).value = userInfo.userInfo;
    popupProfileFormValidator.enableValidation();
    popupProfileFormValidator.hideAllValidationMessages();
    popupProfile.open();
});

cardsContainer.renderItems();