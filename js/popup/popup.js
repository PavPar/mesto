const page = document.querySelector(".page");
const cards_area = document.querySelector(".cards");

const profile = document.querySelector(".profile");
const profile_content = {
    btn_edit: profile.querySelector(".profile__button_type_edit"),
    btn_add: profile.querySelector(".profile__button_type_add"),
    title: profile.querySelector(".profile__title"),
    subtitle: profile.querySelector(".profile__subtitle")
}

const imageZoom_template = document.querySelector("#imageZoom").content;
const card_template = document.querySelector("#card-template");


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


function CreatePopup(title = "popup_title", input_1 = "", input_2 = "", btn_save_action = "", setValue = false) {
    const newPopup = document.querySelector("#popup").content.cloneNode(true);

    const popup_content = {
        btn_exit: newPopup.querySelector(".popup__button_type_exit"),
        btn_save: newPopup.querySelector(".popup__button_type_save"),
        input_1: newPopup.querySelectorAll(".popup__input")[0],
        input_2: newPopup.querySelectorAll(".popup__input")[1],
        title: newPopup.querySelector('.popup__title')
    }

    popup_content.title.appendChild(document.createTextNode(title));
    popup_content.input_1.setAttribute("placeholder", input_1);
    popup_content.input_2.setAttribute("placeholder", input_2);
    if (setValue) {
        popup_content.input_1.setAttribute("value", input_1);
        popup_content.input_2.setAttribute("value", input_2);
    }
    popup_content.btn_exit.addEventListener('click', DeletePopup);
    popup_content.btn_save.addEventListener('click', btn_save_action);
    page.appendChild(newPopup);
}

function DeletePopup(e) {
    e.preventDefault();
    if (e.target.classList.contains('popup__button_type_exit')) {
        document.querySelector('.popup').remove();
    }
}


function setData(e) {
    e.preventDefault();
    const currPopup = page.querySelector('.popup__window');
    profile.querySelector(".profile__title").textContent = currPopup.querySelectorAll(".popup__input")[0].value;
    profile.querySelector(".profile__subtitle").textContent = currPopup.querySelectorAll(".popup__input")[1].value;
    document.querySelector('.popup').remove();
}

function setCardData(e) {
    e.preventDefault();
    const currPopup = page.querySelector('.popup__window');
    createCard(currPopup.querySelectorAll(".popup__input")[0].value, currPopup.querySelectorAll(".popup__input")[1].value, true)
    document.querySelector('.popup').remove();
}


function createZoomImage(image_node, title = image_node.getAttribute('alt')) {
    const zoom_popup = imageZoom_template.cloneNode(true);

    zoom_popup.querySelector('.image-zoom__btn_type-exit').addEventListener('click', deleteImageZoom);
    zoom_popup.querySelector('.image-zoom__title').textContent = title;
    zoom_popup.querySelector('.image-zoom__image').setAttribute('src', image_node.getAttribute('src'));
    zoom_popup.querySelector('.image-zoom__image').setAttribute('alt', image_node.getAttribute('alt'));

    page.append(zoom_popup);
}

function deleteImageZoom(e) {
    e.preventDefault();
    if (e.target.classList.contains('image-zoom__btn_type-exit')) {
        document.querySelector('.image-zoom').remove();
    }
}

function createCard(title, imageLink, reverse = false, alt = title) {
    const newCard = card_template.content.cloneNode(true).querySelector(".card");

    newCard.querySelector('.card__title').textContent = title;
    newCard.querySelector('.card__image').setAttribute('src', imageLink);
    newCard.querySelector('.card__image').setAttribute('alt', alt);

    newCard.querySelector('.card__image').addEventListener('click', () => createZoomImage(newCard.querySelector('.card__image')))

    newCard.querySelector('.card__button_type-like').addEventListener('click', (e) => {
        if (event.target.classList.contains('card__button_type-like')) {
            event.target.classList.toggle('card__button_state-selected');
        }
    })

    newCard.querySelector('.card__button_type-delete').addEventListener('click', (e) => {
        if (event.target.classList.contains('card__button_type-delete')) {
            cards_area.removeChild(event.target.parentNode);
        }
    })

    reverse ? cards_area.insertBefore(newCard, cards_area.firstChild) : cards_area.appendChild(newCard);
}

initialCards.forEach((element) => {
    createCard(element.title, element.src);
});

profile_content.btn_edit.addEventListener("click", () => {
    CreatePopup("Редактировать профиль", profile_content.title.textContent, profile_content.subtitle.textContent, setData, true)
});

profile_content.btn_add.addEventListener("click", () => {
    CreatePopup("Создать карточку", "Название", "Ссылка на картинку", setCardData);
});
