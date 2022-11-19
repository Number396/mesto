import { Card } from "../src/components/Card.js";
import { FormValidator } from "../src/components/FormValidator.js";
import { Section } from "../src/components/Section.js";
// import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../src/components/PopupWithImage.js";
import { PopupWithForm } from "../src/components/PopupWithForm.js";
import { UserInfo } from "../src/components/UserInfo.js";
import {
  profileEditBtn,
  newcardAddBtn,
  formEditElement,
  formAddElement,
  inputName,
  inputOccupation,
  initialCards,
  settings,
  formsCollection,
  formList,
  profileData,
} from "../utils/constants.js";

function handleCardClick(name, link) {
  const imgPopup = new PopupWithImage(".popup_show-image", name, link);
  imgPopup.open();
  imgPopup.setEventListeners();
}

function setEdtInputs() {
  const profileDataInputs = profileInfo.getUserInfo();
  inputName.value = profileDataInputs.title;
  inputOccupation.value = profileDataInputs.subtitle;
}

function setDefValidationSettings(formElement) {
  const currentForm = formsCollection.get(formElement.getAttribute("name"));
  currentForm.resetErrors();
}
function setEdtBtnListeners() {
  profileEditBtn.addEventListener("click", () => {
    setEdtInputs();
    setDefValidationSettings(formEditElement);
    editPopup.open();
  });
}

function setAddBtnListeners() {
  newcardAddBtn.addEventListener("click", () => {
    formAddElement.reset();
    setDefValidationSettings(formAddElement);
    addPopup.open();
  });
}

const profileInfo = new UserInfo(profileData);

const defaultCardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  ".cards__items"
);
defaultCardList.renderItems();

// создаём экземпляр класса валиадации для каждой формы
formList.forEach((formElement) => {
  const validForm = new FormValidator(settings, formElement);

  formsCollection.set(formElement.getAttribute("name"), validForm);
  validForm.enableValidation();
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (formData) => {
    profileInfo.setUserInfo(formData);
    editPopup.close();
  },
});

const addPopup = new PopupWithForm({
  popupSelector: ".popup_add-place",
  handleFormSubmit: (formData) => {
    const cardData = [{ name: formData.placeInput, link: formData.linkInput }];
    const newCard = new Section(
      {
        data: cardData,
        renderer: (item) => {
          const card = new Card(item, "#card-template", handleCardClick);
          const cardElement = card.generateCard();
          newCard.addItem(cardElement);
        },
      },
      ".cards__items"
    );
    newCard.renderItems();
    addPopup.close();
  },
});

editPopup.setEventListeners();
addPopup.setEventListeners();

setEdtBtnListeners();
setAddBtnListeners();
