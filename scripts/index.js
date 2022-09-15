const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const formElement = popup.querySelector("form");
const popupCloseBtn = popup.querySelector(".popup__close-button");
const inputName = popup.querySelector(".popup__input-text_type_name");
const inputOccupation = popup.querySelector(
  ".popup__input-text_type_occupation"
);
const cardsItems = document.querySelector(".cards__items");

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
  popupOpen();
  setInputs();
});

popupCloseBtn.addEventListener("click", popupClose);

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getInputs();
  popupClose();
});

function getInputs() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
}

function setInputs() {
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
}

function popupOpen() {
  popup.classList.add("popup_enabled");
}

function popupClose() {
  popup.classList.remove("popup_enabled");
}

function creatCard(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    const cardContainer = document.createElement("li");
    cardContainer.classList.add("cards__item");

    const imgElement = document.createElement("img");
    imgElement.classList.add("cards__image");
    imgElement.src = initialCards[i].link;
    imgElement.alt = `Изображение ${initialCards[i].name}`;

    const cardDescContainer = document.createElement("div");
    cardDescContainer.classList.add("cards__description");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("cards__title");
    titleElement.textContent = initialCards[i].name;

    const likeButtonElement = document.createElement("button");
    likeButtonElement.classList.add("cards__like-button-icon");

    cardDescContainer.append(titleElement, likeButtonElement);
    cardContainer.append(imgElement, cardDescContainer);
    cardsItems.append(cardContainer);
  }
}

creatCard(initialCards);
// creatCard(name,link);
