export class UserInfo {
    constructor({ title, subtitle }) {
        this._profileTitle = document.querySelector(title);
        this._profileSubtitle = document.querySelector(subtitle);
    };

    setUserInfo(formData) {
        this._profileTitle.textContent = formData.nameInput;
        this._profileSubtitle.textContent = formData.occupationInput;
    };

    getUserInfo() {
        return {
            nameInput: this._profileTitle.textContent,
            occupationInput: this._profileSubtitle.textContent,
        };
    };

    setInitialInfo({ name, about, avatar }) {
        this._profileTitle.textContent = name;
        this._profileSubtitle.textContent = about;
    }
};
