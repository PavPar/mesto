let popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");

let popup__button = {
    exit: popup.querySelector(".popup__button_type_exit"),
    save: popup.querySelector(".popup__button_type_save")
}

let popup__input = {
    name: popup.querySelector(".popup__input_type_name"),
    job: popup.querySelector(".popup__input_type_job")
}

let profile__button = {
    edit: profile.querySelector(".profile__button_type_edit")
}

let profile__data = {
    name: profile.querySelector(".profile__title"),
    job: profile.querySelector(".profile__subtitle")
}

function showPopup() {
    popup.classList.add("popup_status-opened");
    popup.style.display = "block";
    popup__input.name.setAttribute('value',profile__data.name.textContent);
    popup__input.job.setAttribute('value',profile__data.job.textContent);    
}

function hidePopup() {
    popup.classList.remove("popup_status-opened");
    popup.style.display = "none";
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