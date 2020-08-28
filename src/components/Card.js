import { cardTemplateSelector } from "../utils/constants";

/*
класс Card
Cоздаёт карточку с текстом и ссылкой на изображение:
    -принимает в конструктор её данные и селектор её template-элемента; 
    -содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
    -содержит приватные методы для каждого обработчика;
    -содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

    data{
        title: загловок
        src: ссылка на изображение
        alt: (опционально альтернтивный текст избражения, если не указан будет использован title)
    }
*/

//Селекторы которые используются для получения объектов карточки
const cardTemplateSelectors = {
    card: '.card',
    title: '.card__title',
    image: '.card__image',
    btnLike: '.card__button_type-like',
    btnDelete: '.card__button_type-delete',
    likeCnt: '.card__like-counter',
};

const cardElementClasses = {
    btnInvisible: 'card__button_state-invisible',
    btnSelected: 'card__button_state-selected'
}

export default class Card {
    constructor(data, templateSelector, handleCardClick, handleCardLike, handleCardDelete) {
        this.data = data;
        this.templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._cardLikeHandler = handleCardLike.bind(this);
        this._cardDeleteHandler = handleCardDelete.bind(this);

    }

    //Установщик данных картчоки
    _setCardData(alt = this.data.title) {
        this.card.querySelector(cardTemplateSelectors.title).textContent = this.data.title;
        this.image = this.card.querySelector(cardTemplateSelectors.image);
        this.image.src = this.data.src;
        this.image.alt = alt;
        this.setCardLikes(this.card, this.data.likes.length);
    }

    deleteCard(card) {
        const cardParent = card.parentNode;
        cardParent.removeChild(card);
    }

    //Установка слушателей событий
    _setEventListeners() {
        this.btnLike = this.card.querySelector(cardTemplateSelectors.btnLike);
        this.btnDelete = this.card.querySelector(cardTemplateSelectors.btnDelete);
        this.btnLike.addEventListener('click', (evt) => { this._cardLikeHandler(this, evt.target) });
        this.btnDelete.addEventListener('click', this._cardDeleteHandler);
        this.image.addEventListener('click', this._handleCardClick);
    }

    //Генерация карты 
    generateCard() {
        this.card = document.querySelector(this.templateSelector).content.cloneNode(true);
        this._setCardData();
        this._setEventListeners();
        return this.card;
    }

    setCardLikes(cardDOM, likes) {
        cardDOM.querySelector(cardTemplateSelectors.likeCnt).textContent = likes;
    }

    setCardLikeState(cardDOM, liked) {
        liked ?
            cardDOM.querySelector(cardTemplateSelectors.btnLike).classList.add(cardElementClasses.btnSelected) :
            cardDOM.querySelector(cardTemplateSelectors.btnLike).classList.remove(cardElementClasses.btnSelected);
    }

    setDeleteButtonVisibility(cardDOM, visible) {
        visible ?
            cardDOM.querySelector(cardTemplateSelectors.btnDelete).classList.remove(cardElementClasses.btnInvisible) :
            cardDOM.querySelector(cardTemplateSelectors.btnDelete).classList.add(cardElementClasses.btnInvisible);
    }

    isLiked(btn) {
        return !btn.classList.contains(cardElementClasses.btnSelected);
    }

    getCardFromElement(element) {
        return element.closest(cardTemplateSelectors.card);
    }
}