const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const formElement = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__input');

formElement.addEventListener('submit', (evt) => {
    evt.preventDefault;
})
