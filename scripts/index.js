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
const popupCloseEdtBtn = popupEdit.querySelector(".popup__close-button");
const popupCloseAddBtn = popupPlace.querySelector(".popup__close-button");
const popupCloseImgBtn = popupImage.querySelector(".popup__close-button");
const inputName = popupEdit.querySelector(".popup__input-text_type_name");
const inputOccupation = popupEdit.querySelector(".popup__input-text_type_occupation");
const inputPlace = popupPlace.querySelector(".popup__input-text_type_place");
const inputLink = popupPlace.querySelector(".popup__input-text_type_link");
const cardsItems = document.querySelector(".cards__items");
const cardTemplate = document.querySelector("#card-template").content;
const cardItem = cardTemplate.querySelector(".cards__item");
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

profileEditBtn.addEventListener("click", () => {
  openPopup(popupEdit);
  setInputs();
});

profileAddBtn.addEventListener("click", () => {
  inputPlace.value = "";
  inputLink.value = "";
  openPopup(popupPlace);
});

popupCloseEdtBtn.addEventListener("click", () => {
  closePopup(popupEdit);
});

popupCloseAddBtn.addEventListener("click", () => {
  closePopup(popupPlace);
});

popupCloseImgBtn.addEventListener("click", (evt) => {
  closePopup(popupImage);
});

formEditElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const parentElement = evt.target.closest(".popup");
  getInputs();
  closePopup(parentElement);
});

formAddElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const parentElement = evt.target.closest(".popup");
  cardsItems.prepend(createCard(inputPlace.value, inputLink.value));
  closePopup(parentElement);
});

function openPopup(popup) {
  popup.classList.add("popup_enabled");
}

function closePopup(popup) {
  popup.classList.remove("popup_enabled");
}

function getInputs() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
}

function setInputs() {
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
}

function showImage(evt) {
  const cardParent = evt.target.parentElement;
  const cardTitle = cardParent.querySelector(".cards__title");
  imgSrc.src = evt.target.src;
  imgSrc.alt = evt.target.alt;
  imgFigure.textContent = cardTitle.textContent;
}

function createCard(name, link) {
  const cardElement = cardItem.cloneNode(true);
  const cardsImage = cardElement.querySelector(".cards__image");
  cardsImage.src = link;
  cardsImage.alt = `Изображение ${name}.`;
  cardElement.querySelector(".cards__title").textContent = name;

  cardsImage.addEventListener("click", (evt) => {
    openPopup(popupImage);
    showImage(evt);
  });
  cardElement.querySelector(".cards__trash-button-icon").addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  cardElement.querySelector(".cards__like-button-icon").addEventListener("click", (evt) => {
    evt.target.classList.toggle("cards__like-button-icon_active");
  });

  return cardElement;
}

initialCards.forEach((item) => {
  cardsItems.append(createCard(item.name, item.link));
});
