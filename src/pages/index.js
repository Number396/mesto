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
} from "../utils/constants.js";
import { Popup } from "../components/Popup";
import { PopupWithConfirm } from "../components/PopupWithConfirm";




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
    formAddElement.reset();
    setDefValidationSettings(formAddElement);
    addPopup.open();
  });
};

function setUpdateAvatarBtnListener() {
  updateAvatarBtn.addEventListener("click", () => {
    formUpdateAvatar.reset();
    setDefValidationSettings(formUpdateAvatar);
    updateAvatarPopup.open();
  });
};


function handleCardClick(name, link) {
  imgPopup.open(name, link);
};

function handleTrashClick(card, cardID) {
  confirmPopup.open(card, cardID);
  // console.log(cardID);
};
// ------------------------------------------------
function handleLikeClick(cardID, likeState, likeCounter, evt) {
  if (likeState) {
    api.deleteLike(cardID)
      .then((cardInfo) => {
        evt.target.classList.toggle("cards__like-button-icon_active");
        if (cardInfo.likes.length > 0) {
          likeCounter.textContent = cardInfo.likes.length;
        }
        else {
          likeCounter.textContent = '';
        }
      })
      .catch((error) => console.log(`Ошибка удаления лайка: ${error}`));
  }
  else {
    api.setLike(cardID)
      .then((cardInfo) => {
        evt.target.classList.toggle("cards__like-button-icon_active");
        likeCounter.textContent = cardInfo.likes.length;
      })
      .catch((error) => console.log(`Ошибка установки лайка: ${error}`));
  }
};
// ------------------------------------------------
function createCard(item) {
  // console.log(item.likes.length);
  const userID = profileInfo.getUserId(); //todo: вынести в глобальную
  // console.log(userID);
  const card = new Card(item, "#card-template", handleCardClick, handleTrashClick, handleLikeClick, userID);
  const cardElement = card.generateCard();
  newCardSection.addItem(cardElement);
};
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

const confirmPopup = new PopupWithConfirm({
  popupSelector: ".popup_confirm-close",
  handleFormSubmit: (cardID) => {
    api.deleteCard(cardID)
      .then(() => confirmPopup.close(true))
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
      .finally(() => confirmPopup.close(false));
    // confirmPopup.close(true);
  }
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (formData) => {
    // отправляем обновлённые данные на сервер
    api.updateUserInfo(formData)
      //сохраняю обновленные данные с сервера  
      .then((userData) => profileInfo.setUserInfo(userData))
      .catch((error) => console.log(`Ошибка при обновлении профиля: ${error}`))
      .finally(() => editPopup.close());
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
        // console.log(newCardInfo);
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

const updateAvatarPopup = new PopupWithForm({
  popupSelector: ".popup_update-avatar",
  handleFormSubmit: (formData) => {
    api.updateAvatar(formData.linkInputAvatar)
      .then((userData) => {
        profileInfo.updateAvatar(userData);
      })
      .catch((error) => console.log(`Ошибка при обновлении аватара: ${error}`));

    updateAvatarPopup.close();
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


// todo: вынести в константы
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
  .catch((error) => console.log(`Ошибка при установке свойств профиля: ${error}`))
  .then(() => {
    api.getCards()
      .then((initialCards) => {
        // console.log(initialCards);
        newCardSection.renderItems(initialCards);
      })
      .catch((error) => console.log(`Ошибка при загрузке карточек: ${error}`));

  });

// const avatarLink = "https://images.unsplash.com/photo-1667728298919-80c7dbe20f94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHhIeFlUTUhMZ09jfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
// api.updateAvatar(avatarLink)
//   .then()
//   .catch((error) => console.log(`Ошибка при обновлении аватара: ${error}`));