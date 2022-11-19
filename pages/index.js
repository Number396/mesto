import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  popupEdit, popupPlace, popupImage, profileEditBtn, profileAddBtn,
  profileTitle, profileSubtitle, formEditElement, formAddElement, inputName,
  inputOccupation, inputPlace, inputLink, cardsItems, imgSrc, imgFigure,
  initialCards, settings, formsCollection, formList, profileData
} from '../utils/constants.js';



function handleOpenPopup(name, link) {
  const imgPopup = new PopupWithImage(".popup_show-image", name, link);
  imgPopup.open();
  imgPopup.setEventListeners();
};

function setInputs() {
  const profileDataInputs = profileInfo.getUserInfo();
  inputName.value = profileDataInputs.title;
  inputOccupation.value = profileDataInputs.subtitle;
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
    editPopup.open();
  });

  profileAddBtn.addEventListener("click", () => {
    formAddElement.reset();
    setDefaultSettings(formAddElement);
    addPopup.open();
  });
};
// -----------------------------------------------------------------------
const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', handleOpenPopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
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
    // console.log('name input: ', formData.nameInput);

    profileInfo.setUserInfo(formData);

    // profileTitle.textContent = formData.nameInput;
    // profileSubtitle.textContent = formData.occupationInput;

    editPopup.close();
    // console.log("profileTitle: ", profileTitle.textContent);
    // console.log("profileSubTitle: ", profileSubtitle.textContent);
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

setProfileBtnListeners();

// const profileData = { title: ".profile__title", subtitle: ".profile__subtitle" };
const profileInfo = new UserInfo(profileData);