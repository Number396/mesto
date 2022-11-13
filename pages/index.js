import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import {
  popupEdit, popupPlace, popupImage, profile, profileEditBtn, profileAddBtn,
  profileTitle, profileSubtitle, formEditElement, formAddElement, inputName,
  inputOccupation, inputPlace, inputLink, cardsItems, imgSrc, imgFigure,
  initialCards, settings
} from '../utils/constants.js';

function setCloseBtnListeners() {
  const closeButtons = document.querySelectorAll(".popup__close-button");

  closeButtons.forEach((button) => {
    const popup = button.closest(".popup");

    button.addEventListener("click", () => closePopup(popup));
  });
}

function setOverlayListeners() {
  const overlayList = document.querySelectorAll(".popup");

  overlayList.forEach((overlayElement) => {
    overlayElement.addEventListener("click", (evt) => {
      if (evt.target == overlayElement) closePopup(overlayElement);
    });
  });
}

function fillProfileFromInputs() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
}

function setInputs() {
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_enabled");

    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_enabled");
  document.addEventListener("keydown", keyHandler);
}

function closePopup(popup) {
  popup.classList.remove("popup_enabled");
  document.removeEventListener("keydown", keyHandler);
}

function setDefaultSettings(formElement) {
  const currentForm = formsCollection.get(formElement.getAttribute('name'));
  currentForm.resetErrors();
}

function handleOpenPopup(name, link) {
  imgSrc.src = link;
  imgSrc.alt = `Изображение ${name}.`;
  imgFigure.textContent = name;
  openPopup(popupImage);
};

function setSubmitBtnListeners() {
  formEditElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    fillProfileFromInputs();
    closePopup(popupEdit);
  });

  formAddElement.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const data = { name: inputPlace.value, link: inputLink.value };
    const card = new Card(data, '#card-template', handleOpenPopup);

    cardsItems.prepend(card.generateCard());
    closePopup(popupPlace);
  });
};

function setProfileBtnListeners() {
  profileEditBtn.addEventListener("click", () => {
    setInputs();
    setDefaultSettings(formEditElement);

    openPopup(popupEdit);
  });

  profileAddBtn.addEventListener("click", () => {
    formAddElement.reset();

    setDefaultSettings(formAddElement);

    openPopup(popupPlace);
  });
};

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template', handleOpenPopup);

  cardsItems.append(card.generateCard());
});

//мапа: (ключ: форма, значение: экземпляр класса валидации для этой формы)
const formsCollection = new Map();
const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {
  const validForm = new FormValidator(settings, formElement);

  formsCollection.set(formElement.getAttribute('name'), validForm);
  validForm.enableValidation();
});

setSubmitBtnListeners();
setProfileBtnListeners();
setCloseBtnListeners();
setOverlayListeners();
