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
    profileSelectors,
    cardClasses,
    cardSelectors
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '967deb70-9a4e-4589-809b-0ac8252fbe07',
        'Content-Type': 'application/json'
    }
});

const popupConfirm = new PopupWithForm(popupTypeSelectors.popupConfirm, () => {
    popupConfirm.close();
    api.deleteCard(popupConfirm.tagetCard.class.data._id)
        .then(() => {
            popupConfirm.tagetCard.class.deleteCard(popupConfirm.tagetCard.DOMtarget);
        })
        .catch(err => api.errorMsgHandler(err));

});


const popupAvatar = new PopupWithForm(popupTypeSelectors.popupAvatar, (inputData) => {
    const textBefore = popupAvatar.submitBtn.textContent;
    popupAvatar.setButtonText("Обновление...");
    api.changeUserAvatar(inputData["src"])
        .then(res => {
            profileUserInfo.setUserAvatar(res.avatar);
        })
        .catch(err => api.errorMsgHandler(err))
        .finally(() => {
            popupAvatar.setButtonText(textBefore);
            popupAvatar.close();
        });
})

const popupImage = new PopupWithImage(popupTypeSelectors.popupWImage)

function createCard({ _id, name, link, likes }) {
    return new Card({ title: name, src: link, likes: likes.length, _id: _id }, cardTemplateSelector,
        () => {
            popupImage.open({ title: name, src: link });
        },
        function (event) {
            if (!event.target.classList.contains(cardClasses.btnSelected)) {
                api.likeCard(this.data._id)
                    .then(res => {
                        event.target.classList.toggle(cardClasses.btnSelected);
                        this.setCardLikes(event.target.closest( cardSelectors.card), res.likes.length);
                    })
                    .catch(err => api.errorMsgHandler(err));
            } else {
                api.dislikeCard(this.data._id)
                    .then(res => {
                        event.target.classList.toggle(cardClasses.btnSelected);
                        this.setCardLikes(event.target.closest(cardSelectors.card), res.likes.length);
                    })
                    .catch(err => api.errorMsgHandler(err));
            }
        },
        function (event) {
            popupConfirm.tagetCard = {
                class: this,
                DOMtarget: event.target.closest(cardSelectors.card)
            };
            popupConfirm.open();
        })
        .generateCard();
}

const cardsContainer = new Section({
    items: [], renderer: (itemData) => {
        return createCard(itemData);
    }
}, cardContainerSelector);

const popupCard = new PopupWithForm(popupTypeSelectors.popupCard, (inputData) => {
    const textBefore = popupCard.submitBtn.textContent;
    popupCard.setButtonText("Создание...");

    api.addNewCard({ name: inputData.title, link: inputData.src })
        .then(res => {
            cardsContainer.addItem(createCard(res));
        })
        .catch(err => api.errorMsgHandler(err))
        .finally(() => {
            popupCard.setButtonText(textBefore);
            popupCard.close();
        });
});

const profileUserInfo = new UserInfo({
    userNameSelector: profileSelectors.title,
    userInfoSelector: profileSelectors.subtitle,
    userAvatarSelector: profileSelectors.avatar
});

const popupProfile = new PopupWithForm(popupTypeSelectors.popupProfile, (inputData) => {
    const textBefore = popupProfile.submitBtn.textContent;
    popupProfile.setButtonText("Сохранение...");

    api.changeUserInfo({ name: inputData.userName, about: inputData.userInfo }).then(({ name, about }) => {
        profileUserInfo.setUserInfo({ userName: name, userInfo: about });
    })
        .catch(err => api.errorMsgHandler(err))
        .finally(() => {
            popupProfile.setButtonText(textBefore);
            popupProfile.close();
        });
});

const popupCardValidator = new FormValidator(formValidatorConfig, popupCard.popup.querySelector(formValidatorConfig.formSelector));
const popupProfileValidator = new FormValidator(formValidatorConfig, popupProfile.popup.querySelector(formValidatorConfig.formSelector));
const popupAvatarValidator = new FormValidator(formValidatorConfig, popupAvatar.popup.querySelector(formValidatorConfig.formSelector));


const profileElements = {
    title: popupProfile.popup.querySelector(profileSelectors.input_title),
    subtitle: popupProfile.popup.querySelector(profileSelectors.input_subtitle),
    btnAdd: document.querySelector(profileSelectors.btnAdd),
    btnEdit: document.querySelector(profileSelectors.btnEdit),
    avatar: document.querySelector(profileSelectors.avatar)
}

profileElements.btnAdd.addEventListener("click", () => {
    popupCardValidator.hideAllValidationMessages();
    popupCard.open();
});

profileElements.btnEdit.addEventListener("click", () => {
    const userInfo = profileUserInfo.getUserInfo();
    profileElements.title.value = userInfo.userName;
    profileElements.subtitle.value = userInfo.userInfo;

    popupProfileValidator.hideAllValidationMessages();

    popupProfile.open();
});

profileElements.avatar.addEventListener("click", () => {
    popupAvatarValidator.hideAllValidationMessages();
    popupAvatar.open();
})

popupCardValidator.enableValidation();
popupProfileValidator.enableValidation();
popupAvatarValidator.enableValidation();

popupCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();

api.getInitialCards()
    .then(res => {
        res.forEach(data => {
            cardsContainer.addItem(createCard(data))
        });
    })
    .catch(err => api.errorMsgHandler(err));

api.getUserInfo()
    .then(res => {
        profileUserInfo.setUserInfo({ userName: res.name, userInfo: res.about });
        profileUserInfo.setUserAvatar(res.avatar);
    })
    .catch(err => api.errorMsgHandler(err));