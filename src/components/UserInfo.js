export class UserInfo {
    constructor({ title, subtitle, avatar, userId }) {
        this._profileTitle = document.querySelector(title);
        this._profileSubtitle = document.querySelector(subtitle);
        this._profileAvatar = document.querySelector(avatar);

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

    setInitialInfo({ name, about, avatar, userId }) {
        this._profileTitle.textContent = name;
        this._profileSubtitle.textContent = about;
        this._profileAvatar.src = avatar;
        this._profileAvatar.alt = `Фотография ${name}.`;
        this._userId = userId;
    };
};
