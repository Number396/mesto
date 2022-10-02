// const settings = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible' (popup__input-error_active)
// };

const formElement = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`); //span ошибки

console.log(formInput.id);
console.log(formError);

const showError = (input, errorMessage) => {
    input.classList.add('popup__input_type_error'); //показываем краную нижнюю черту
    formError.textContent = errorMessage; //текс ошибки валидации
    formError.classList.add('popup__input-error_active'); //показываем span с ошибкой

};

const hideErrow = (input) => {
    input.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__input-error_active');
};

const checkInputValidity = () => {
    if (!formInput.validity.valid) {
        showError(formInput, formInput.validationMessage);
    }
    else {
        hideErrow(formInput);

    }
};

formElement.addEventListener('submit', (evt) => {
    evt.preventDefault;
});

formInput.addEventListener('input', () => checkInputValidity());