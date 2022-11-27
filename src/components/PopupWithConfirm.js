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
            this._handleFormSubmit(this._cardID);
        });
    }

    open(card, cardID) {
        super.open();
        this._card = card;
        this._cardID = cardID;
        // console.log(this._cardID);
    };

    close(yes) {
        if (yes) this._card.remove();
        super.close();
    }

}