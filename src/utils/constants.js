export const popupEdit = document.querySelector(".popup_edit-profile");
export const popupPlace = document.querySelector(".popup_add-place");
export const profile = document.querySelector(".profile");
export const profileEditBtn = profile.querySelector(".profile__edit-button");
export const newcardAddBtn = profile.querySelector(".profile__add-button");

export const formEditElement = popupEdit.querySelector("form");
export const formAddElement = popupPlace.querySelector("form");

export const settings = {
    formSelector: ".popup__form",
    fieldsetSelector: ".popup__set",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};

export const profileData = {
    title: ".profile__title",
    subtitle: ".profile__subtitle",
};
//мапа: (ключ: форма, значение: экземпляр класса валидации для этой формы)
export const formsCollection = new Map();
export const formList = Array.from(
    document.querySelectorAll(settings.formSelector)
);

export const initialCards = [
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
