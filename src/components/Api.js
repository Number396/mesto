export class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;

    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return Promise.reject(`Ошибка HTTP: ${response.status} ${response.statusText}`);
                }
            })
    };
};