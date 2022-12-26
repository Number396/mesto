export const popupEdit = document.querySelector(".popup_type_edit");
export const popupPlace = document.querySelector(".popup_type_add");
export const popupUpdateAvatar = document.querySelector(".popup_type_avatar");
export const profile = document.querySelector(".profile");
export const profileEditBtn = profile.querySelector(".profile__edit-button");
export const newcardAddBtn = profile.querySelector(".profile__add-button");
export const updateAvatarBtn = profile.querySelector(".profile__avatar-button");

export const formEditElement = popupEdit.querySelector("form");
export const formAddElement = popupPlace.querySelector("form");
export const formUpdateAvatar = popupUpdateAvatar.querySelector("form");

export const settings = {
    formSelector: ".popup__form",
    fieldsetSelector: ".popup__set",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
};

export const profileSelectors = {
    title: ".profile__title",
    subtitle: ".profile__subtitle",
    avatar: ".profile__avatar"
};
//мапа: (ключ: форма, значение: экземпляр класса валидации для этой формы)
export const formsCollection = new Map();
export const formList = Array.from(
    document.querySelectorAll(settings.formSelector)
);
export const apiConfig = {
    url: "https://mesto.nomoreparties.co/v1/cohort-54",
    headers: {
        authorization: "2a75c4c8-a205-4cc6-b062-6f230688b6cb",
        "Content-Type": "application/json",
    },
};
