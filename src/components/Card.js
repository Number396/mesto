export class Card {
    constructor(data, templateSelector, openPopupFn) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopupFn = openPopupFn;
    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".cards__item")
            .cloneNode(true);

        return cardElement;
    };

    _handleRemoveTrash() {
        this._cardElement.remove();
    };

    _handleSwitchLikeBtn(evt) {
        evt.target.classList.toggle("cards__like-button-icon_active");
    };

    _setEventListeners() {
        this._cardImage.addEventListener("click", () => {
            this._openPopupFn(this._name, this._link);
        });

        this._cardElement
            .querySelector(".cards__trash-button-icon")
            .addEventListener("click", () => {
                this._handleRemoveTrash();
            });

        this._cardElement
            .querySelector(".cards__like-button-icon")
            .addEventListener("click", this._handleSwitchLikeBtn);
    };

    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".cards__image");

        this._cardImage.src = this._link;
        this._cardImage.alt = `Изображение ${this._name}.`;
        this._cardElement.querySelector(".cards__title").textContent = this._name;
        this._setEventListeners();

        return this._cardElement;
    };
}
