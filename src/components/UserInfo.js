export class UserInfo {
    constructor({ title, subtitle, avatar }) {
        this._profileTitle = document.querySelector(title);
        this._profileSubtitle = document.querySelector(subtitle);
        this._profileAvatar = document.querySelector(avatar);

    };

    getUserInfo() {
        return {
            name: this._profileTitle.textContent,
            about: this._profileSubtitle.textContent,
        };
    };

    setUserInfo({ name, about, avatar, _id }) {
        this._profileTitle.textContent = name;
        this._profileSubtitle.textContent = about;
        this._profileAvatar.src = avatar;
        this._profileAvatar.alt = `Фотография ${name}.`;
        this._userID = _id;
    };
};
