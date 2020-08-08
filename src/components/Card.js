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
    btnDelete: '.card__button_type-delete'
};

export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    //Установщик данных картчоки
    _setCardData(alt = this.data.title) {
        this.card.querySelector(cardTemplateSelectors.title).textContent = this.data.title;
        this.image = this.card.querySelector(cardTemplateSelectors.image);
        this.image.src = this.data.src;
        this.image.alt = alt;
    }

    //Обработчик лайка карточки
    _cardLikeHandler() {
        this.btnLike.classList.toggle('card__button_state-selected');
    }

    //Обработчик удаления карточки
    _cardDeleteHandler(target) {
        const domCard = target.closest(cardTemplateSelectors.card);
        const cardParent = domCard.parentNode;
        cardParent.removeChild(domCard);
    }

    //Установка слушателей событий
    _setEventListeners() {
        this.btnLike = this.card.querySelector(cardTemplateSelectors.btnLike);
        this.btnLike.addEventListener('click', () => this._cardLikeHandler());
        this.card.querySelector(cardTemplateSelectors.btnDelete)
            .addEventListener('click', (event) => this._cardDeleteHandler(event.target), { once: true });
        this.image.addEventListener('click',this._handleCardClick);
    }

    //Генерация карты 
    generateCard() {
        this.card = document.querySelector(this.templateSelector).content.cloneNode(true);
        this._setCardData(this.data.alt);
        this._setEventListeners();
        return this.card;
    }
}