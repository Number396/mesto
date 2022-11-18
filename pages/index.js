import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import {
  popupEdit, popupPlace, popupImage, profileEditBtn, profileAddBtn,
  profileTitle, profileSubtitle, formEditElement, formAddElement, inputName,
  inputOccupation, inputPlace, inputLink, cardsItems, imgSrc, imgFigure,
  initialCards, settings, formsCollection, formList
} from '../utils/constants.js';



// function setCloseBtnListeners() {
//   const closeButtons = document.querySelectorAll(".popup__close-button");

//   closeButtons.forEach((button) => {
//     const popup = button.closest(".popup");

//     button.addEventListener("click", () => closePopup(popup));
//   });
// }

// function setOverlayListeners() {
//   const overlayList = document.querySelectorAll(".popup");

//   overlayList.forEach((overlayElement) => {
//     overlayElement.addEventListener("click", (evt) => {
//       if (evt.target == overlayElement) closePopup(overlayElement);
//     });
//   });
// }



// function keyHandler(evt) {
//   console.log(evt);
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_enabled");

//     closePopup(openedPopup);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add("popup_enabled");
//   document.addEventListener("keydown", keyHandler);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_enabled");
//   document.removeEventListener("keydown", keyHandler);
// }


// function fillProfileFromInputs() {
//   profileTitle.textContent = inputName.value;
//   profileSubtitle.textContent = inputOccupation.value;
// }
// function handleOpenPopupImg(name, link) {
//   imgSrc.src = link;
//   imgSrc.alt = `Изображение ${name}.`;
//   imgFigure.textContent = name;
//   openPopup(popupImage);
// };

// function setSubmitBtnListeners() {
//   formEditElement.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//     fillProfileFromInputs();
//     closePopup(popupEdit);
//   });

//   formAddElement.addEventListener("submit", (evt) => {
//     evt.preventDefault();

//     const cardData = [{ name: inputPlace.value, link: inputLink.value }];
//     // const card = new Card(cardData, '#card-template', handleOpenPopup);
//     // cardsItems.prepend(card.generateCard());
//     const newCard = new Section({
//       data: cardData,
//       renderer: (item) => {
//         const card = new Card(item, '#card-template', handleOpenPopup);
//         const cardElement = card.generateCard();
//         newCard.addItem(cardElement);
//       }
//     }, ".cards__items");
//     newCard.renderItems();
//     // todo: использовать метод close объекта
//     closePopup(popupPlace);
//   });
// };



// function renderElements() {
//   initialCards.forEach((item) => {
//     const card = new Card(item, '#card-template', handleOpenPopup);

//     cardsItems.append(card.generateCard());
//   });
// }
// renderElements();
function handleOpenPopup(name, link) {
  const imgPopup = new PopupWithImage(".popup_show-image", name, link);
  imgPopup.open();
  imgPopup.setEventListeners();
};

function setInputs() {
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
}

function setDefaultSettings(formElement) {
  const currentForm = formsCollection.get(formElement.getAttribute('name'));
  currentForm.resetErrors();
}
////////////////////////////////////////////////////
function setProfileBtnListeners() {

  profileEditBtn.addEventListener("click", () => {
    setInputs();
    setDefaultSettings(formEditElement);
    // console.log('popup_edit-profile');
    // const editPopup = new PopupWithForm({
    //   popupSelector: ".popup_edit-profile",
    //   handleFormSubmit: (formData) => {
    //     console.log('name input: ', formData.nameInput);

    //     profileTitle.textContent = formData.nameInput;
    //     profileSubtitle.textContent = formData.occupationInput;

    //     editPopup.close();
    //     console.log(profileTitle.textContent);
    //     console.log(profileSubtitle.textContent);
    //   }
    // });
    editPopup.open();
    // openPopup(popupEdit);
  });

  // const editPopup = new PopupWithForm({
  //   popupSelector: ".popup_edit-profile",
  //   handleFormSubmit: (formData) => {
  //     // console.log('name input: ', formData.nameInput);

  //     profileTitle.textContent = formData.nameInput;
  //     profileSubtitle.textContent = formData.occupationInput;

  //     editPopup.close();
  //     // console.log(profileTitle.textContent);
  //     // console.log(profileSubtitle.textContent);
  //   }
  // });

  // editPopup.setEventListeners();

  profileAddBtn.addEventListener("click", () => {
    formAddElement.reset();
    setDefaultSettings(formAddElement);
    addPopup.open();
    // openPopup(popupPlace);
  });
};
// -----------------------------------------------------------------------
const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', handleOpenPopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    // this.addItem(cardElement);
  }
}, ".cards__items");

defaultCardList.renderItems();

// //мапа: (ключ: форма, значение: экземпляр класса валидации для этой формы)
// const formsCollection = new Map();
// const formList = Array.from(document.querySelectorAll(settings.formSelector));

// создаём экземпляр класса валиадации для каждой формы
formList.forEach((formElement) => {
  const validForm = new FormValidator(settings, formElement);

  formsCollection.set(formElement.getAttribute('name'), validForm);
  validForm.enableValidation();
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (formData) => {
    console.log('name input: ', formData.nameInput);

    profileTitle.textContent = formData.nameInput;
    profileSubtitle.textContent = formData.occupationInput;

    editPopup.close();
    console.log(profileTitle.textContent);
    console.log(profileSubtitle.textContent);
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: ".popup_add-place",
  handleFormSubmit: (formData) => {
    const cardData = [{ name: formData.placeInput, link: formData.linkInput }];

    const newCard = new Section({
      data: cardData,
      renderer: (item) => {
        const card = new Card(item, '#card-template', handleOpenPopup);
        const cardElement = card.generateCard();
        newCard.addItem(cardElement);
      }
    }, ".cards__items");

    newCard.renderItems();
    addPopup.close();
  }
});
addPopup.setEventListeners();


// setSubmitBtnListeners();
setProfileBtnListeners();
// setCloseBtnListeners();
// setOverlayListeners();

// const closeButtons = document.querySelectorAll(".popup__close-button");
// console.log(typeof (closeButtons));