import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector("form");
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }

    open(card) {
        super.open();
        this._card = card;
        console.log(this._card);
    };

    close() {
        super.close();
        this._card.remove();
    }

}