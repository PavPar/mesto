const popupTypeSelectors = {
    popupProfile: '.popup-profile',
    popupWImage: ".popup_type-imgZoom",
    popupCard: '.popup-card',
    popupConfirm:'.popup-confirm'
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
    input_title: ".popup__input-title",
    input_subtitle: ".popup__input-subtitle"
};

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

export {
    popupTypeSelectors,
    cardTemplateSelector,
    cardContainerSelector,
    formValidatorConfig,
    profileSelectors,
    initialCards
}