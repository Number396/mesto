
export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close-button");
    };

    open() {
        this._popup.classList.add("popup_enabled");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
        console.log('openPopup');

    };

    close() {
        this._popup.classList.remove("popup_enabled");
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
        console.log('closePopup');

    };
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            // console.log('inside if');
            // console.log('this: ', this);
            this.close();
        }
        // console.log('handleEscClose');
        // console.log(evt);
    };
    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => {
            console.log('setEventListeners');
            if (evt.target == this._popup) {
                this.close();
            }
        });

    };
};