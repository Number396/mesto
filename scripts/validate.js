const settings = {
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__set',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, input, errorMessage, setting) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`); // Находим span элемента ошибки внутри самой функции

    errorElement.textContent = '';
    input.classList.add(setting.inputErrorClass); //подсвечиваем поле красным border-bottom-color: red;
    errorElement.textContent = errorMessage; //текс отшибки запихиваем в спан
    errorElement.classList.add(setting.errorClass); //делаем span видимым opacity: 1; по дефолту span скрыт через класс
};

const hideInputError = (formElement, input, setting) => {
    const errorElement = formElement.querySelector(`.${input.id}-error`);

    input.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, setting) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, setting);
    }
    else {
        hideInputError(formElement, inputElement, setting);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement, setting) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(setting.inactiveButtonClass);
    }
    else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(setting.inactiveButtonClass);
    }
};

//вешаем слушатели на поля филдсетов
function setEventListeners(formElement, setting) {
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector)); //получаем список всех полей на филдсете и запихиваем в массив
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, setting);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, setting);
            toggleButtonState(inputList, buttonElement, setting);
        });
    })
};
//вешаем слушатели submit на все формы и вызываем функцию для установки слушателей на поля каждоый формы
function enableValidation(setting) {
    // const formList = Array.from(document.querySelectorAll('.popup__form'));
    const formList = Array.from(document.querySelectorAll(setting.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(setting.fieldsetSelector));

        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset, setting);
        });

    });
};

enableValidation(settings);