export class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._fieldsetSelector = data.fieldsetSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._inactiveButtonClass);

        }
        else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _showInputError(inputElement, errorMessage) {
        // Находим span элемента ошибки внутри самой функции
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        errorElement.textContent = '';
        //подсвечиваем поле красным border-bottom-color: red;
        inputElement.classList.add(this._inputErrorClass);
        //текс отшибки запихиваем в спан
        errorElement.textContent = errorMessage;
        //делаем span видимым opacity: 1; по дефолту span скрыт через css
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        // Находим span элемента ошибки внутри самой функции
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };


    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        //получаем список всех полей на филдсете и запихиваем в массив
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    resetErrors() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
};