import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";
const popupEdit = document.querySelector(".popup_edit-profile");
const popupPlace = document.querySelector(".popup_add-place");
const popupImage = document.querySelector(".popup_show-image");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formEditElement = popupEdit.querySelector("form");
const formAddElement = popupPlace.querySelector("form");
const inputName = popupEdit.querySelector(".popup__input_type_name");
const inputOccupation = popupEdit.querySelector(".popup__input_type_occupation");
const inputPlace = popupPlace.querySelector(".popup__input_type_place");
const inputLink = popupPlace.querySelector(".popup__input_type_link");
const cardsItems = document.querySelector(".cards__items");
const imgSrc = popupImage.querySelector(".popup__image");
const imgFigure = popupImage.querySelector(".popup__caption");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const settings = {
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};



// const myForm = someData.get(formEditElement.getAttribute('name'));
// myForm.resetErrors();



// function setDefaultSettings(popup) {
//   const inputList = Array.from(popup.querySelectorAll(settings.inputSelector));
//   const buttonElement = popup.querySelector(settings.submitButtonSelector);

//   inputList.forEach((inputElement) => {
//     hideInputError(popup, inputElement, settings);
//   });

//   toggleButtonState(inputList, buttonElement, settings);
// }

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

function getInputs() {
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

// function showImage(name, link) {
//   imgSrc.src = link;
//   imgSrc.alt = `Изображение ${name}.`;
//   imgFigure.textContent = name;
// }

// class Card {
//   constructor(data, templateSelector) {
//     this._name = data.name;
//     this._link = data.link;
//     this._templateSelector = templateSelector;
//   };

//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._templateSelector)
//       .content.querySelector(".cards__item")
//       .cloneNode(true);

//     return cardElement;
//   };

//   _showImage() {
//     imgSrc.src = this._link;
//     imgSrc.alt = `Изображение ${this._name}.`;
//     imgFigure.textContent = this._name;
//   }

//   generateCard() {
//     this._cardElement = this._getTemplate();
//     const cardImage = this._cardElement.querySelector('.cards__image');

//     cardImage.src = this._link;
//     cardImage.alt = `Изображение ${this._name}.`;
//     this._cardElement.querySelector('.cards__title').textContent = this._name;
//     this._setEventListeners();

//     return this._cardElement;
//   };

//   _setEventListeners() {
//     this._cardElement.querySelector('.cards__image').addEventListener('click', () => {
//       openPopup(popupImage);
//       this._showImage();
//     });

//     this._cardElement.querySelector('.cards__trash-button-icon').addEventListener('click', () => {
//       this._cardElement.remove();
//     });

//     this._cardElement.querySelector('.cards__like-button-icon').addEventListener('click', (evt) => {
//       evt.target.classList.toggle('cards__like-button-icon_active');
//     });
//   };
// };

// function createCard(name, link) {
//   const cardElement = cardItem.cloneNode(true);
//   const cardsImage = cardElement.querySelector(".cards__image");

//   cardsImage.src = link;
//   cardsImage.alt = `Изображение ${name}.`;
//   cardElement.querySelector(".cards__title").textContent = name;

//   cardsImage.addEventListener("click", () => {
//     openPopup(popupImage);
//     showImage(name, link);
//   });

//   cardElement
//     .querySelector(".cards__trash-button-icon")
//     .addEventListener("click", () => {
//       cardElement.remove();
//     });

//   cardElement
//     .querySelector(".cards__like-button-icon")
//     .addEventListener("click", (evt) => {
//       evt.target.classList.toggle("cards__like-button-icon_active");
//     });

//   return cardElement;
// }

// console.log(formEditElement.getAttribute('name'));
function setDefaultSettings(formElement) {
  const currentForm = formsCollection.get(formElement.getAttribute('name'));
  currentForm.resetErrors();
}

profileEditBtn.addEventListener("click", () => {
  setInputs();
  setDefaultSettings(formEditElement);

  openPopup(popupEdit);
});

profileAddBtn.addEventListener("click", () => {
  inputPlace.value = "";
  inputLink.value = "";

  setDefaultSettings(formAddElement);

  openPopup(popupPlace);
});

formEditElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getInputs();
  closePopup(popupEdit);
});

formAddElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const data = { name: inputPlace.value, link: inputLink.value };
  const card = new Card(data, '#card-template', openPopup, popupImage, imgSrc, imgFigure);
  cardsItems.prepend(card.generateCard());
  closePopup(popupPlace);
});

// initialCards.forEach((item) => {
//   cardsItems.append(createCard(item.name, item.link));
// });

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template', openPopup, popupImage, imgSrc, imgFigure);
  // const cardElement = card.generateCard();
  cardsItems.append(card.generateCard());
});

setCloseBtnListeners();
setOverlayListeners();

//мапа: (ключ: форма, значение: экземпляр класса валидации для этой формы)
const formsCollection = new Map();
const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((formElement) => {

  const validForm = new FormValidator(settings, formElement);
  // console.log(formElement.getAttribute('name'));
  formsCollection.set(formElement.getAttribute('name'), validForm);
  // console.log(validForm);
  validForm.enableValidation();
  // const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsetSelector));
  // fieldsetList.forEach((fieldsetElement) => {
  //     const validForm = new FormValidator(settings, fieldsetElement);
  //     console.log(validForm);
  //     validForm.enableValidation();
});