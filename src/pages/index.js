import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  profileEditBtn,
  newcardAddBtn,
  formEditElement,
  formAddElement,
  settings,
  formsCollection,
  formList,
  profileSelectors,
} from "../utils/constants.js";

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function setEdtInputs() {
  const profileDataInputs = profileInfo.getUserInfo();
  editPopup.setInputValues(profileDataInputs);
}

function setDefValidationSettings(formElement) {
  const currentForm = formsCollection.get(formElement.getAttribute("name"));
  currentForm.resetErrors();
}

function setEdtBtnListeners() {
  profileEditBtn.addEventListener("click", () => {
    setEdtInputs(); //устанавливаю значения инпутов с html полей
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

function createCard(item) {
  // console.log(item.likes.length);
  const card = new Card(item, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  newCardSection.addItem(cardElement);
}
// ------------------------------------------------------------------------
const profileInfo = new UserInfo(profileSelectors);
const imgPopup = new PopupWithImage(".popup_show-image");
const newCardSection = new Section({ renderer: createCard }, ".cards__items");
//рисуем начальниые карточки
// newCardSection.renderItems(initialCards);

// создаём экземпляр класса валиадации для каждой формы
formList.forEach((formElement) => {
  const validForm = new FormValidator(settings, formElement);

  formsCollection.set(formElement.getAttribute("name"), validForm);
  validForm.enableValidation();
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (formData) => {
    // console.log(formData);
    // отправляем обновлённые данные на сервер
    api.updateUserInfo(formData)
      .then((userData) => {
        // console.log(userData);
        // profileInfo.setUserInfo(userData);
        //сохраняю обновленные данные с сервера
        profileInfo.setUserInfo(userData);
      })
      .catch((error) => console.log(`Ошибка при обновлении профиля: ${error}`));
    // profileInfo.setUserInfo(formData);
    editPopup.close();
  },
});

const addPopup = new PopupWithForm({
  popupSelector: ".popup_add-place",
  // используется при клике на кнопку submite и висит в слушателе. 
  // formData - данные с инпутов
  handleFormSubmit: (formData) => {
    // console.log(formData);

    api.addCard({ name: formData.placeInput, link: formData.linkInput })
      .then((newCardInfo) => {
        console.log(newCardInfo);
        // const cardData = [{ name: formData.placeInput, link: formData.linkInput }];
        const cardData = [newCardInfo];
        // console.log(cardData);
        newCardSection.renderItems(cardData);
      })
      .catch((error) => console.log(`Ошибка добавления карточки: ${error}`));
    // const cardData = [{ name: formData.placeInput, link: formData.linkInput }];
    // newCardSection.renderItems(cardData);
    addPopup.close();
  },
});

imgPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();

setEdtBtnListeners();
setAddBtnListeners();

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "2a75c4c8-a205-4cc6-b062-6f230688b6cb",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);

api.getUserInfo()
  .then((userData) => {
    // console.log(userData);
    profileInfo.setUserInfo(userData
      // name: userData.name,
      // about: userData.about,
      // avatar: userData.avatar,
      // userId: userData._id
    );
    // return new Promise(resolve => resolve(userData));
    // return new Promise(function (resolve, reject) {
    //   resolve(userData);
    // });
  })

  // .then((res) => {
  //   console.log(res);
  //   api.getCards()
  //     .then((initialCards) => {
  //        console.log(initialCards);
  //       newCardSection.renderItems(initialCards);
  //     })
  //     .catch((error) => console.log(`Ошибка при загрузке карточек: ${error}`));
  // })
  .catch((error) => console.log(`Ошибка при установке свойств профиля: ${error}`));

api.getCards()
  .then((initialCards) => {
    // console.log(initialCards);
    newCardSection.renderItems(initialCards);
  })
  .catch((error) => console.log(`Ошибка при загрузке карточек: ${error}`));