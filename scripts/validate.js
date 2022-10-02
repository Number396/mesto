// const settings = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible' (popup__input-error_active)
// };

const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`); //span ошибки

// console.log(form);
// console.log(formInput.id);
// console.log(formError);

const showInputError = (formElement, input, errorMessage) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`); // Находим элемент ошибки внутри самой функции

    input.classList.add('popup__input_type_error'); //подсвечиваем поле красным border-bottom-color: red;
    errorElement.textContent = errorMessage; //текс отшибки запихиваем в спан
    errorElement.classList.add('popup__input-error_active'); //делаем span видимым opacity: 1; по дефолту span скрыт через класс

};

const hideInputError = (formElement, input) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`);

    input.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);

    }
};
//вешаем слушатели на поля формы
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input')); //получаем список всех полей на форме и запихиваем в массив через Array.from
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => checkInputValidity(formElement, inputElement));
    })
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault;
});

//вешаем слушатели на все формы и вызываем функцию для установки слушателей на поля каждоый формы
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    console.log(formList);
    formList.forEach((formElement) => {
        console.log(formElement);
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

// formInput.addEventListener('input', () => checkInputValidity(form, formInput));
// setEventListeners(form);
enableValidation();