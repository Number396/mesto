export class UserInfo {
    constructor({ title, subtitle }) {
        this._profileTitle = document.querySelector(title);
        this._profileSubtitle = document.querySelector(subtitle);

    };

    setUserInfo(formData) {
        this._profileTitle.textContent = formData.nameInput;
        this._profileSubtitle.textContent = formData.occupationInput;
        console.log(this._profileTitle);
        console.log(this._profileSubtitle);
    };

    getUserInfo() {
        return { title: this._profileTitle.textContent, subtitle: this._profileSubtitle.textContent }
    };
};