import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._imgSrc = this._popup.querySelector(".popup__image");
        this._imgFigure = this._popup.querySelector(".popup__caption");
        this._name = name;
        this._link = link;
    };
    open() {
        this._imgSrc.src = this._link;
        this._imgFigure.alt = `Изображение ${this._name}.`;
        this._imgFigure.textContent = this._name;
        super.open();

        console.log(this._imgFigure.alt);

    }
}

