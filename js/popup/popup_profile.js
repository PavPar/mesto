const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");

const popup__button = {
    exit: popup.querySelector(".popup__button_type_exit"),
    save: popup.querySelector(".popup__button_type_save")
}

const popup__input = {
    name: popup.querySelectorAll(".popup__input")[0],
    job: popup.querySelectorAll(".popup__input")[1]
}

const profile__button = {
    edit: profile.querySelector(".profile__button_type_edit")
}

const profile__data = {
    name: profile.querySelector(".profile__title"),
    job: profile.querySelector(".profile__subtitle")
}

function showPopup() {
    popup.classList.add("popup_status-opened");
    popup__input.name.setAttribute('value',profile__data.name.textContent);
    popup__input.job.setAttribute('value',profile__data.job.textContent);    
}

function hidePopup() {
    popup.classList.remove("popup_status-opened");
}

function setData(e){
    e.preventDefault();
    profile__data.name.textContent = popup__input.name.value;
    profile__data.job.textContent = popup__input.job.value;
    hidePopup();
}

profile__button.edit.addEventListener("click", showPopup);
popup__button.exit.addEventListener("click", hidePopup);
popup__button.save.addEventListener("click",setData);