const profile = document.querySelector(".profile");

const profile_content = {
    btn_edit: profile.querySelector(".profile__button_type_edit"),
    btn_add: profile.querySelector(".profile__button_type_add"),
    title: profile.querySelector(".profile__title"),
    subtitle: profile.querySelector(".profile__subtitle")
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
profile_content.btn_edit.addEventListener("click", () => {
    CreatePopup("Редактировать профиль", profile_content.title.textContent, profile_content.subtitle.textContent, setData, true)
});

profile_content.btn_add.addEventListener("click", () => {
    CreatePopup("Создать карточку", "Название", "Ссылка на картинку", setCardData);
});

