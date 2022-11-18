import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('form');
    };

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        // console.log(typeof (this._inputList));
        this._formValues = {};

        this._inputList.forEach((input) => {
            this._formValues[input.id] = input.value;

        });

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._form.reset();

    };

}