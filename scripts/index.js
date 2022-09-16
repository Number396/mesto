const popupEdit = document.querySelector(".popup_edit-profile");
const popupPlace = document.querySelector(".popup_add-place");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileAddBtn = profile.querySelector(".profile__add-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formElement = popupEdit.querySelector("form");
const popupCloseEdtBtn = popupEdit.querySelector(".popup__close-button");
const popupCloseAddBtn = popupPlace.querySelector(".popup__close-button");
const inputName = popupEdit.querySelector(".popup__input-text_type_name");
const inputOccupation = popupEdit.querySelector(".popup__input-text_type_occupation");
const cardsItems = document.querySelector(".cards__items");
const cardTemplate = document.querySelector("#card-template").content;

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

function openPopup(popup) {
  popup.classList.add("popup_enabled");
};

function closePopup(popup) {
  popup.classList.remove("popup_enabled");
};

profileEditBtn.addEventListener("click", () => {
  openPopup(popupEdit);
  setInputs();
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popupPlace);
});
popupCloseEdtBtn.addEventListener("click", () => {
  closePopup(popupEdit);
});
popupCloseAddBtn.addEventListener('click', () => {
  closePopup(popupPlace);
});


formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getInputs();
  closePopup();
});

function getInputs() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
}

function setInputs() {
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
}


// function closePopup() {
//   popupEdit.classList.remove("popup_enabled");
// }


function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".cards__item").cloneNode(true);
  cardElement.querySelector(".cards__image").src = link;
  cardElement.querySelector(".cards__image").alt = `Изображение ${name}`;
  cardElement.querySelector(".cards__title").textContent = name;
  cardsItems.append(cardElement);
}

initialCards.forEach((item) => { createCard(item.name, item.link); });
