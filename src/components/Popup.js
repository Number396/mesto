export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close-button");
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popup.classList.add("popup_enabled");
        document.addEventListener("keydown", this._handleEscClose);
    };

    close() {
        this._popup.classList.remove("popup_enabled");
        document.removeEventListener("keydown", this._handleEscClose);
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    setEventListeners() {
        this._closeButton.addEventListener("click", () => this.close());
        this._popup.addEventListener("click", (evt) => {
            // console.log('setEventListeners');
            if (evt.target == this._popup) {
                this.close();
            }
        });
    };
};
