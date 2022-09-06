const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const formElement = document.querySelector("form");

function formSubmitHandler(evt) {
  evt.preventDefault();

  const inputName = popup.querySelector(".input__text_type_name");
  const inputOccupation = popup.querySelector(".input__text_type_occupation");
  const profileTitle = profile.querySelector(".profile__title");
  const profileSubtitle = profile.querySelector(".profile__subtitle");

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
  popup.classList.toggle("popup_enabled");
}

profileEditBtn.addEventListener("click", () => {
  popup.classList.toggle("popup_enabled");
  const inputName = popup.querySelector(".input__text_type_name");
  const inputOccupation = popup.querySelector(".input__text_type_occupation");
  const profileTitle = profile.querySelector(".profile__title");
  const profileSubtitle = profile.querySelector(".profile__subtitle");
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
});

const popupCloseBtn = popup.querySelector(".popup__close-button");
popupCloseBtn.addEventListener("click", () => {
  popup.classList.toggle("popup_enabled");
});

formElement.addEventListener("submit", formSubmitHandler);
