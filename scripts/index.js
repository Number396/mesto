const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formElement = popup.querySelector("form");
const popupCloseBtn = popup.querySelector(".popup__close-button");
const inputName = popup.querySelector(".popup__input-text_type_name");
const inputOccupation = popup.querySelector(
  ".popup__input-text_type_occupation"
);

profileEditBtn.addEventListener("click", () => {
  popupOpen();
  setInputs();
});

popupCloseBtn.addEventListener("click", popupClose);

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getInputs();
  popupClose();
});

function getInputs() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
}

function setInputs() {
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
}

function popupOpen() {
  popup.classList.add("popup_enabled");
}

function popupClose() {
  popup.classList.remove("popup_enabled");
}
