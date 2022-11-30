export class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardUrl = `${this._baseUrl}/cards`;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(
                `Ошибка HTTP: ${response.status} ${response.statusText}`
            );
        }
    }

    // url: "https://mesto.nomoreparties.co/v1/cohort-54",
    getUserInfo() {
        return fetch(this._userUrl, {
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    getCards() {
        return fetch(this._cardUrl, {
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    updateUserInfo(formData) {
        return fetch(this._userUrl, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            }),
        }).then((response) => this._checkResponse(response));
    }

    addCard({ name, link }) {
        return fetch(this._cardUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((response) => this._checkResponse(response));
    }

    deleteCard(cardID) {
        return fetch(`${this._cardUrl}/${cardID}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    setLike(cardID) {
        return fetch(`${this._cardUrl}/${cardID}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    deleteLike(cardID) {
        return fetch(`${this._cardUrl}/${cardID}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((response) => this._checkResponse(response));
    }

    // getCardInfo(cardID) {
    //     return fetch(`${this._cardUrl}/${cardID}/likes`, {
    //         headers: this._headers,
    //     }).then((response) => this._checkResponse(response));
    // }
}
