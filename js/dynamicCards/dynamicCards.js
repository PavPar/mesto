const cards_area = document.querySelector(".cards");
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


function createCard(title, imageLink,reverse=false, alt = title) {
    const newCard = card_template.content.cloneNode(true).querySelector(".card");

    newCard.querySelector('.card__title').textContent = title;
    newCard.querySelector('.card__image').setAttribute('src',imageLink);
    newCard.querySelector('.card__image').setAttribute('alt',alt);
    
    newCard.querySelector('.card__button_type-like').addEventListener('click',(e)=>{
        if(event.target.classList.contains('card__button_type-like')){
            event.target.classList.toggle('card__button_state-selected');
        }
    })
    
    newCard.querySelector('.card__button_type-delete').addEventListener('click',(e)=>{
        if(event.target.classList.contains('card__button_type-delete')){
            cards_area.removeChild(event.target.parentNode);
        }
    })

    reverse?cards_area.insertBefore(newCard,cards_area.firstChild):cards_area.appendChild(newCard);
}


initialCards.forEach((element)=>{
    createCard(element.title,element.src);
});

