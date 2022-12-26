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
  updateAvatarBtn,
  formAddElement,
  formUpdateAvatar,
  settings,
  formsCollection,
  formList,
  profileSelectors,
  apiConfig
} from "../utils/constants.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm";
let userID = '';

function setEdtInputs() {
  const profileDataInputs = profileInfo.getUserInfo();
  editPopup.setInputValues(profileDataInputs);
};

function setDefValidationSettings(formElement) {
  const currentForm = formsCollection.get(formElement.getAttribute("name"));
  currentForm.resetErrors();
};

function setEdtBtnListener() {
  profileEditBtn.addEventListener("click", () => {
    setEdtInputs(); //устанавливаю значения инпутов с html полей
    setDefValidationSettings(formEditElement);
    editPopup.open();
  });
}

function setAddBtnListener() {
  newcardAddBtn.addEventListener("click", () => {
    setDefValidationSettings(formAddElement);
    addPopup.open();
  });
};

function setUpdateAvatarBtnListener() {
  updateAvatarBtn.addEventListener("click", () => {
    setDefValidationSettings(formUpdateAvatar);
    updateAvatarPopup.open();
  });
};

function handleCardClick(name, link) {
  imgPopup.open(name, link);
};

function handleTrashClick(card, cardID) {
  confirmPopup.open(card, cardID);
};

function handleLikeClick(card) {
  if (card.getLikeState()) {
    api.deleteLike(card.getID())
      .then((cardInfo) => card.addLike(cardInfo))
      .catch((error) => console.log(`Ошибка удаления лайка: ${error}`));
  }
  else {
    api.setLike(card.getID())
      .then((cardInfo) => card.addLike(cardInfo))
      .catch((error) => console.log(`Ошибка установки лайка: ${error}`));
  }
};

function getCard(item) {
  const card = new Card(item, "#card-template", handleCardClick, handleTrashClick, handleLikeClick, userID);
  const cardElement = card.generateCard();
  return cardElement;
}

function createCard(item) {
  const cardElement = getCard(item);
  newCardSection.addItem(cardElement);
};

const profileInfo = new UserInfo(profileSelectors);
const imgPopup = new PopupWithImage(".popup_show-image");
const newCardSection = new Section({ renderer: createCard }, ".cards__items");

// создаём экземпляр класса валиадации для каждой формы
formList.forEach((formElement) => {
  const validForm = new FormValidator(settings, formElement);

  formsCollection.set(formElement.getAttribute("name"), validForm);
  validForm.enableValidation();
});

const confirmPopup = new PopupWithConfirm({
  popupSelector: ".popup_type_confirm",
  handleFormSubmit: (card, cardID) => {
    api.deleteCard(cardID)
      .then(() => {
        confirmPopup.close();
        card.remove();
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
  }
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: (formData) => {
    editPopup.renderLoading(true);
    // отправляем обновлённые данные на сервер
    api.updateUserInfo(formData)
      //сохраняю обновленные данные с сервера  
      .then((userData) => {
        profileInfo.setUserInfo(userData)
        editPopup.close();
      })
      .catch((error) => console.log(`Ошибка при обновлении профиля: ${error}`))
      .finally(() => {
        editPopup.renderLoading(false);
      });
  },
});

const addPopup = new PopupWithForm({
  popupSelector: ".popup_type_add",
  // используется при клике на кнопку submite и висит в слушателе. 
  // formData - данные с инпутов
  handleFormSubmit: (formData) => {
    addPopup.renderLoading(true);

    api.addCard({ name: formData.placeInput, link: formData.linkInput })
      .then((newCardInfo) => {
        const cardData = [newCardInfo];
        newCardSection.renderItems(cardData);
        addPopup.close();
      })
      .catch((error) => console.log(`Ошибка добавления карточки: ${error}`))
      .finally(() => {
        addPopup.renderLoading(false);
      });
  }
});

const updateAvatarPopup = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: (formData) => {

    updateAvatarPopup.renderLoading(true);

    api.updateAvatar(formData.linkInputAvatar)
      .then((userData) => {
        console.log(userData);
        profileInfo.setUserInfo(userData);
        updateAvatarPopup.close();
      })
      .catch((error) => console.log(`Ошибка при обновлении аватара: ${error}`))
      .finally(() => {
        updateAvatarPopup.renderLoading(false);
      });
  }
});

imgPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
confirmPopup.setEventListeners();
updateAvatarPopup.setEventListeners();

setEdtBtnListener();
setAddBtnListener();
setUpdateAvatarBtnListener();

const api = new Api(apiConfig);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, initialCards]) => {
    console.log(userData);
    profileInfo.setUserInfo(userData);
    userID = userData._id;
    newCardSection.renderItems(initialCards);
  })
  .catch((error) => console.log(`Ошибка при загрузке страницы: ${error}`));
