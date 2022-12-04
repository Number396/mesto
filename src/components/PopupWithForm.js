import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector("form");
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._submitBtn = this._popup.querySelector(".popup__submit-button");
        this._submitBtnText = this._submitBtn.textContent;
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.id] = input.value;
        });

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._form.reset();
    };

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.id];
        });
    };

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
        }
        else {
            this._submitBtn.textContent = this._submitBtnText;
        }

    }
};
