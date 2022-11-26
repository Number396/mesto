export class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardUrl = `${this._baseUrl}/cards`;
    }
    // url: "https://mesto.nomoreparties.co/v1/cohort-54",
    getUserInfo() {
        return fetch(this._userUrl, {
            headers: this._headers,
        }).then((response) => this._checkResponse(response))
        // if (response.ok) {
        //     return response.json();
        // } else {
        //     return Promise.reject(
        //         `Ошибка HTTP: ${response.status} ${response.statusText}`
        //     );
        // }
        // });
    };

    getCards() {
        return fetch(this._cardUrl, {
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
        return fetch(this._userUrl, {
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

    addCard({ name, link }) {
        return fetch(this._cardUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
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

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(
                `Ошибка HTTP: ${response.status} ${response.statusText}`
            );
        }
    };


}

