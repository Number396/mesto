export class Card {
    constructor(data, templateSelector, handleCardClick, handleTrashClick, handleLikeClick, userID) {
        this._name = data.name;
        this._link = data.link;
        this._cardID = data._id;
        this._userID = userID;
        this._userCardID = data.owner._id;
        this._likes = data.likes; //массив Like с инфой о пользователе
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
        // console.log(this._userID);
        // console.log(this._userID, this._userCardID);
        // console.log(this._likes);

    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".cards__item")
            .cloneNode(true);

        return cardElement;
    };

    // _handleRemoveTrash() {
    //     this._cardElement.remove();
    // };

    // _handleSwitchLikeBtn(evt) {
    //     evt.target.classList.toggle("cards__like-button-icon_active");
    // };

    _isLiked() {
        const result = this._likes.some(item => item._id === this._userID);
        return result;
    };

    _setEventListeners() {

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });

        if (this._userID === this._userCardID) {
            this._cardTrash.addEventListener("click", () => {
                // this._handleRemoveTrash();
                this._handleTrashClick(this._cardElement, this._cardID);
            });
        }
        else {
            this._cardTrash.classList.toggle("cards__trash-button-icon_hide");
        }

        this._cardElement
            .querySelector(".cards__like-button-icon")
            .addEventListener("click", (evt) => {
                this._handleLikeClick(this._cardID, this._likeState, this._likeCounter, evt);
                this._likeState = !this._likeState;
            })
    };

    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".cards__image");
        this._likeCounter = this._cardElement.querySelector(".cards__like-counter");
        this._likeBtn = this._cardElement.querySelector(".cards__like-button-icon");
        this._cardTrash = this._cardElement.querySelector(".cards__trash-button-icon");

        this._cardImage.src = this._link;
        this._cardImage.alt = `Изображение ${this._name}.`;
        this._cardElement.querySelector(".cards__title").textContent = this._name;

        this._likeState = this._isLiked();

        if (this._likes.length > 0) {
            this._likeCounter.textContent = this._likes.length;
        };

        if (this._likeState) {
            this._likeBtn.classList.add("cards__like-button-icon_active");
        };

        this._setEventListeners();

        return this._cardElement;
    };
}
