const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCloseBtn = popup.querySelector(".popup__close-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

let textProfileTitle = profileTitle.textContent;
let textProfileSubtitle = profileSubtitle.textContent;

let inputName = popup.querySelector(".input__text_type_name");
let inputOccupation = popup.querySelector(".input__text_type_occupation");

inputName.value = textProfileTitle;
inputOccupation.value = textProfileSubtitle;
console.log(inputName.value);
console.log(inputOccupation.value);

// profileEditBtn.onclick = () => {
//     popup.style.display = 'block';
// }

profileEditBtn.addEventListener("click", () => {
  popup.style.display = "block";
  inputName.value = textProfileTitle;
  inputOccupation.value = textProfileSubtitle;
  console.log(inputName.value);
  console.log(inputOccupation.value);
});

popupCloseBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// window.onclick = function(event) {
//     if (event.target == popup) {
//         popup.style.display = 'none';
//     }
// }
