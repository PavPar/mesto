import './index.css';

import Api from "../components/Api.js";

import Card from '../components/Card.js'; // Класс card для создания карточек
import FormValidator from '../components/FormValidator.js'; //Класс для валидации формы
import Section from '../components/Section.js'; // Класс для размещения объектов на странице
import UserInfo from '../components/UserInfo.js'; //Класс для изменения пользовательской информации

import PopupWithForm from '../components/PopupWithForm.js'; //Класс для управления popup с формой
import PopupWithImage from '../components/PopupWithImage.js'; //Класс popup с приближением изображения

import {
    popupTypeSelectors,
    cardTemplateSelector,
    cardContainerSelector,
    formValidatorConfig,
    profileSelectors
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '967deb70-9a4e-4589-809b-0ac8252fbe07',
        'Content-Type': 'application/json'
    }
});

const popupImage = new PopupWithImage(popupTypeSelectors.popupWImage)

//Функция для создания карты с изображением 
function createCard({ title, src }) {
    return new Card({ title: title, src: src }, cardTemplateSelector, () => {
        popupImage.open({ title: title, src: src });
    }).generateCard();
}

const cardsContainer = new Section({
    items: [], renderer: (itemData) => {
        return createCard(itemData);
    }
}, cardContainerSelector);

const popupCard = new PopupWithForm(popupTypeSelectors.popupCard, (inputData) => {
    api.addNewCard({ name: inputData.title, link: inputData.src })
        .then(res => {
            cardsContainer.addItem(createCard({ title: res.name, src: res.link }));
        })
        .catch(err => api.errorMsgHandler(err));
    popupCard.close();
});

const profileUserInfo = new UserInfo({
    userNameSelector: profileSelectors.title,
    userInfoSelector: profileSelectors.subtitle
});

const popupProfile = new PopupWithForm(popupTypeSelectors.popupProfile, (inputData) => {
    // profileUserInfo.setUserInfo(inputData);
    api.changeUserInfo({ name: inputData.userName, about: inputData.userInfo }).then(({ name, about }) => {
        profileUserInfo.setUserInfo({ userName: name, userInfo: about });
    })
        .catch(err => api.errorMsgHandler(err));
    popupProfile.close();
});

const popupCardValidator = new FormValidator(formValidatorConfig, popupCard.popup.querySelector(formValidatorConfig.formSelector));
const popupProfileValidator = new FormValidator(formValidatorConfig, popupProfile.popup.querySelector(formValidatorConfig.formSelector));

const profileElements = {
    title: popupProfile.popup.querySelector(profileSelectors.input_title),
    subtitle: popupProfile.popup.querySelector(profileSelectors.input_subtitle),
    btnAdd: document.querySelector(profileSelectors.btnAdd),
    btnEdit: document.querySelector(profileSelectors.btnEdit)
}

profileElements.btnAdd.addEventListener("click", () => {
    popupCardValidator.hideAllValidationMessages();

    popupCard.open()
});

profileElements.btnEdit.addEventListener("click", () => {
    const userInfo = profileUserInfo.getUserInfo();
    profileElements.title.value = userInfo.userName;
    profileElements.subtitle.value = userInfo.userInfo;

    popupProfileValidator.hideAllValidationMessages();

    popupProfile.open();
});


popupCardValidator.enableValidation();
popupProfileValidator.enableValidation();

popupCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();

cardsContainer.renderItems();

api.getInitialCards()
    .then(res => {
        res.forEach(data => {
            cardsContainer.addItem(createCard({ title: data.name, src: data.link }))
        });
    })
    .catch(err => api.errorMsgHandler(err));

api.getUserInfo()
    .then(res => {
        profileUserInfo.setUserInfo({ userName: res.name, userInfo: res.about });
    })
    .catch(err => api.errorMsgHandler(err));