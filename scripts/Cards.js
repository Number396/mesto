export class Card {
    constructor(data, templateSelector, openPopupFn, popupImage, imgSrc, imgFigure) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopupFn = openPopupFn;
        this._popupImage = popupImage;
        this._imgSrc = imgSrc;
        this._imgFigure = imgFigure;
    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".cards__item")
            .cloneNode(true);

        return cardElement;
    };

    _showImage() {
        this._imgSrc.src = this._link;
        this._imgSrc.alt = `Изображение ${this._name}.`;
        this._imgFigure.textContent = this._name;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.cards__image').addEventListener('click', () => {
            this._openPopupFn(this._popupImage);
            this._showImage();
        });

        this._cardElement.querySelector('.cards__trash-button-icon').addEventListener('click', () => {
            this._cardElement.remove();
        });

        this._cardElement.querySelector('.cards__like-button-icon').addEventListener('click', (evt) => {
            evt.target.classList.toggle('cards__like-button-icon_active');
        });
    };

    generateCard() {
        this._cardElement = this._getTemplate();
        const cardImage = this._cardElement.querySelector('.cards__image');

        cardImage.src = this._link;
        cardImage.alt = `Изображение ${this._name}.`;
        this._cardElement.querySelector('.cards__title').textContent = this._name;
        this._setEventListeners();

        return this._cardElement;
    };
};