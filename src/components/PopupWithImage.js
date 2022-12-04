import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imgSrc = this._popup.querySelector(".popup__image");
        this._imgFigure = this._popup.querySelector(".popup__caption");
    };

    open(name, link) {
        this._name = name;
        this._link = link;
        this._imgSrc.src = this._link;
        this._imgSrc.alt = `Изображение ${this._name}.`;
        this._imgFigure.textContent = this._name;
        super.open();
    };
};
