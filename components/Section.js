import { handleOpenPopup } from '../pages/index.js';
import { Card } from './Card.js';

export class Section {
    constructor({ data }, containerSelector) {
        this._renderedItems = data;
        this._container = document.querySelector(containerSelector);

    }

    addItem(element) {
        this._container.prepend(element);
    };

    renderItems() {
        this._renderedItems.forEach((item) => {
            const card = new Card(item, '#card-template', handleOpenPopup);
            const cardElement = card.generateCard();
            this.addItem(cardElement);
        });

    };
};