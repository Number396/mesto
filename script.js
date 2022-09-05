function formSubmitHandler(evt) {
  evt.preventDefault();
  const popup = document.querySelector(".popup");
  const inputName = popup.querySelector(".input__text_type_name");
  const inputOccupation = popup.querySelector(".input__text_type_occupation");
  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputOccupation.value;
  popup.classList.toggle("popup-show");
}

const formElement = document.querySelector("form");
formElement.addEventListener("submit", formSubmitHandler);

const profileEditBtn = document.querySelector(".profile__edit-button");
profileEditBtn.addEventListener("click", () => {
  const popup = document.querySelector(".popup");
  popup.classList.toggle("popup-show");
  const inputName = popup.querySelector(".input__text_type_name");
  const inputOccupation = popup.querySelector(".input__text_type_occupation");
  const profileTitle = document.querySelector(".profile__title");
  const profileSubtitle = document.querySelector(".profile__subtitle");
  inputName.value = profileTitle.textContent;
  inputOccupation.value = profileSubtitle.textContent;
});

const popupCloseBtn = document.querySelector(".popup__close-button");
popupCloseBtn.addEventListener("click", () => {
  const popup = document.querySelector(".popup");
  popup.classList.toggle("popup-show");
});

// window.onclick = function(event) {
//     if (event.target == popup) {
//         popup.style.display = 'none';
//     }
// }
