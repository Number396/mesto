export class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
    }
    // url: "https://mesto.nomoreparties.co/v1/cohort-54",
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(
                    `Ошибка HTTP: ${response.status} ${response.statusText}`
                );
            }
        });
    };

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(
                    `Ошибка HTTP: ${response.status} ${response.statusText}`
                );
            }
        });
    };

    updateUserInfo(formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(
                    `Ошибка HTTP: ${response.status} ${response.statusText}`
                );
            }
        });
    };
}
