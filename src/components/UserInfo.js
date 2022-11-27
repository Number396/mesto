export class UserInfo {
    constructor({ title, subtitle, avatar }) {
        this._profileTitle = document.querySelector(title);
        this._profileSubtitle = document.querySelector(subtitle);
        this._profileAvatar = document.querySelector(avatar);

    };

    // setUserInfo(formData) {
    //     this._profileTitle.textContent = formData.nameInput;
    //     this._profileSubtitle.textContent = formData.occupationInput;
    // };

    getUserInfo() {
        return {
            name: this._profileTitle.textContent,
            about: this._profileSubtitle.textContent,
        };
    };
    // { name, about, avatar, userId }
    setUserInfo(userData) {
        this._profileTitle.textContent = userData.name;
        this._profileSubtitle.textContent = userData.about;
        this._profileAvatar.src = userData.avatar;
        this._profileAvatar.alt = `Фотография ${userData.name}.`;
        this._userID = userData._id;
    };

    getUserId() {
        // console.log(this._userId);
        return this._userID;
    }
};
